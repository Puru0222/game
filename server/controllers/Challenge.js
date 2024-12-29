const cron = require("node-cron");
const mongoose = require("mongoose");
const Challange = require("../models/Challange");
const User = require("../models/User");

const logger = {
  info: (message, data = {}) => {
    console.log(new Date().toISOString(), message, data);
  },
  error: (message, error) => {
    console.error(new Date().toISOString(), message, error);
  },
};

const distributeBalance = async (challenge, session) => {
  try {
    if (challenge.winners.length === 0 && challenge.users.length > 0) {
      const share = Math.floor(challenge.balance / challenge.users.length);

      const bulkOperations = challenge.users.map((userId) => ({
        updateOne: {
          filter: { _id: userId },
          update: { $inc: { balance: share } },
        },
      }));

      await User.bulkWrite(bulkOperations, { session });

      logger.info(`Balance distributed`, {
        challengeId: challenge._id,
        share,
        userCount: challenge.users.length,
      });
    }

    challenge.balanceDistributed = true;
    challenge.status = "completed";
    await challenge.save({ session });
  } catch (error) {
    logger.error(
      `Error distributing balance for challenge ${challenge._id}`,
      error
    );
    throw error;
  }
};

const processChallengesInBatches = async () => {
  const batchSize = 100;
  let processedCount = 0;
  let failedCount = 0;
  const startTime = Date.now();

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const fourHoursAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);

      const totalCount = await Challange.countDocuments({
        createdAt: { $lte: fourHoursAgo },
        balanceDistributed: false,
      });

      logger.info(`Starting challenge processing`, { totalCount });

      let processed = 0;
      while (true) {
        const challenges = await Challange.find({
          createdAt: { $lte: fourHoursAgo },
          balanceDistributed: false,
        })
          .limit(batchSize)
          .session(session);

        if (challenges.length === 0) break;

        await Promise.all(
          challenges.map(async (challenge) => {
            try {
              await distributeBalance(challenge, session);
              processedCount++;
            } catch (error) {
              failedCount++;
              logger.error(`Failed to process challenge`, {
                challengeId: challenge._id,
                error: error.message,
              });
            }
          })
        );

        processed += challenges.length;
        logger.info(`Processed batch`, {
          processed,
          total: totalCount,
          remaining: totalCount - processed,
        });
      }

      const deleteResult = await Challange.deleteMany(
        { balanceDistributed: true },
        { session }
      );

      logger.info(`Completed processing`, {
        processedCount,
        failedCount,
        deletedCount: deleteResult.deletedCount,
        duration: `${(Date.now() - startTime) / 1000}s`,
      });
    });
  } catch (error) {
    logger.error("Transaction failed", error);
    throw error;
  } finally {
    session.endSession();
  }

  return {
    processedCount,
    failedCount,
    duration: Date.now() - startTime,
  };
};

const MAX_RETRIES = 3;
let retryCount = 0;

const processWithRetry = async () => {
  try {
    retryCount = 0;
    await processChallengesInBatches();
  } catch (error) {
    retryCount++;
    logger.error(
      `Processing failed, attempt ${retryCount} of ${MAX_RETRIES}`,
      error
    );

    if (retryCount < MAX_RETRIES) {
      setTimeout(processWithRetry, 5 * 60 * 1000);
    } else {
      logger.error("All retry attempts failed", error);
    }
  }
};

cron.schedule("30 21 * * *", processWithRetry, {
  timezone: "Asia/Kolkata",
});

// cron.schedule("*/2 * * * *", processWithRetry, {
//   timezone: "Asia/Kolkata",
// });

// module.exports = {
//   processChallengesInBatches,
//   processWithRetry
// };
