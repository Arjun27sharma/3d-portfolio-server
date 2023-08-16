const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  // New sections for the portfolio website

  about_desc: {
    type: String,
    default: "",
  },
  tagline: {
    type: String,
    default: "",
  },
  logo: {
    type: String,
    default: "",
  },

  services: [
    {
      name: {
        type: String,
        required: true,
      },
      imgUrl: {
        type: String,
        required: true,
      },
    }
  ],


  workExperience: [
    {
      title: {
        type: String,
        required: true,
      },
      company_name: {
        type: String,
        required: true,
      },
      companyImgUrl: {
        type: String,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        // required: true,
      },
      desc:
      {
        type: String,
        required: true,
      }
    },
  ],

  skills: [
    {
      name: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    },
  ],


  project_desc: {
    type: String,
    required: true,
  },

  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      imageURL: {
        type: String,
        required: true,
      },
      projectURL: {
        type: String,
      },



    },
  ],







  socialMediaLinks: {
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    github: {
      type: String,
    },
    // Add more social media links as needed
  },


  testimonials: [
    {
      name: {
        type: String,
        required: true,
      },
      testimonial: {
        type: String,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      }
    },
  ],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
