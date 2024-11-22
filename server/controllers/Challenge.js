const cron = require("node-cron");
const mongoose = require("mongoose");
const Challange = require("../models/Challange");
const User = require("../models/User");

const distributeBalance = async (challenge) => {
  if (challenge.winners.length === 0) {
    const userCount = challenge.users.length;

    if (userCount > 0) {
      const share = Math.floor(challenge.balance / userCount);

      for (const userId of challenge.users) {
        await User.findByIdAndUpdate(userId, { $inc: { balance: share } });
      }

      console.log(`Balance distributed for challenge ${challenge._id}`);
    } else {
      console.log(
        `No users in challenge ${challenge._id}, no balance distributed.`
      );
    }
  } else {
    console.log(`Winners already declared for challenge ${challenge._id}.`);
  }

  challenge.balanceDistributed = true;
  challenge.status = "completed";
  await challenge.save();
};

// const getChallengesToProcess = async () => {
//   return await Challange.find({ status: "pending", balanceDistributed: false });
// };

const deleteProcessedChallenges = async () => {
  const result = await Challange.deleteMany({ balanceDistributed: true });
  console.log(`Deleted ${result.deletedCount} processed challenges.`);
};

// const processChallenges = async () => {
//   const challenges = await getChallengesToProcess();

//   for (const challenge of challenges) {
//     await distributeBalance(challenge);
//   }

//   await deleteProcessedChallenges();
// };

const processChallengesInBatches = async () => {
  const batchSize = 100;
  let skip = 0;

  while (true) {
    const challenges = await Challange.find({
      balanceDistributed: false,
    })
      .limit(batchSize)
      .skip(skip);

    if (challenges.length === 0) break;

    for (const challenge of challenges) {
      await distributeBalance(challenge);
    }

    skip += batchSize;
  }

  await deleteProcessedChallenges();
};

cron.schedule("0 3 * * *", async () => {
  console.log("Running 3 AM job to process challenges...");
  await processChallengesInBatches();
});
