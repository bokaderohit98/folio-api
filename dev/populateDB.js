const User = require("../models/User");
const Education = require("../models/Education");
const Work = require("../models/Work");
const Achivement = require("../models/Achivement");

exports.saveUser = () => {
  const education = new Education({
    from: Date.now(),
    to: Date.now(),
    institute: "NSIT"
  });

  const work = new Work({
    from: Date.now(),
    to: Date.now(),
    organization: "Innovaccer",
    positon: "intern"
  });

  const achivement = new Achivement({
    title: "Best Intern",
    date: Date.now()
  });

  const user = new User({
    name: "Rohit",
    email: "bokaderohit98@gmail.com",
    password: "fklsdjlf",
    dob: Date.now(),
    gender: "Male",
    social: {
      github: "bokaderohit98",
      twitter: "yelloveaddict"
    }
  });

  user.works.push(work);
  user.educations.push(education);
  user.achivements.push(achivement);

  user
    .save()
    .then(res => {
      console.log("saved");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteUser = async () => {
  await User.deleteMany({});
  await Work.deleteMany({});
  await Education.deleteMany({});
  await Achivement.deleteMany({});
};
