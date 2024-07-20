const puppeteer = require('puppeteer');

async function registerOnPlatform(platformUrl, steps, data) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.goto(platformUrl, { waitUntil: 'networkidle2' });

    for (const step of steps) {
      for (const [selector, value] of Object.entries(step.selectors)) {
        try {
          await page.waitForSelector(selector, { timeout: 75000 });
          if (value && data[value]) {
            await page.type(selector, data[value]);
          }
        } catch (error) {
          console.error(`Error in step with selector ${selector}:`, error);
        }
      }
      if (step.submit) {
        try {
          await page.click(step.submit);
          await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
        } catch (error) {
          console.error(`Error clicking submit button with selector ${step.submit}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Registration error:', error);
  } finally {
    // Закомментировано, чтобы браузер не закрывался автоматически
    // await browser.close();
  }
}

exports.registerOnPlatform = registerOnPlatform;

async function registerFacebook(data) {
  const steps = [
    {
      selectors: {
        'input[name="firstname"]': 'name',
        'input[name="lastname"]': 'surname',
        'input[name="reg_email__"]': 'email',
        'input[name="reg_email_confirmation__"]': 'email',
        'input[name="reg_passwd__"]': 'password',
        'select[name="birthday_day"]': 'dob_day',
        'select[name="birthday_month"]': 'dob_month',
        'select[name="birthday_year"]': 'dob_year',
        'input[name="sex"]': 'sex',
      },
      submit: 'button[name="websubmit"]'
    }
  ];
  await registerOnPlatform('https://www.facebook.com/', steps, data);
}

async function registerTwitter(data) {
  const steps = [
    {
      selectors: {
        'input[name="name"]': 'name',
        'input[name="phone_number"]': 'phone',
        'select[name="month"]': 'dob_month',
        'select[name="day"]': 'dob_day',
        'select[name="year"]': 'dob_year',
      },
      submit: 'div[data-testid="NextButton"]'
    },
    {
      submit: 'div[data-testid="SignUpButton"]'
    }
  ];
  await registerOnPlatform('https://twitter.com/i/flow/signup', steps, data);
}

async function registerInstagram(data) {
  const steps = [
    {
      selectors: {
        'input[name="emailOrPhone"]': 'phone',
        'input[name="fullName"]': 'name',
        'input[name="username"]': 'username',
        'input[name="password"]': 'password',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://www.instagram.com/accounts/emailsignup/', steps, data);
}



async function registerVK(data) {
  const steps = [
    {
      selectors: {
        'input[name="phone"]': 'phone'
      },
      submit: 'button[type="submit"]'
    },
    {
      selectors: {
        'input[name="otp"]': 'verification_code'
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://id.vk.com/auth?app_id=51649761&device_id=227cf221-ca45-40fc-b3f4-d637425b90fd&response_type=code&redirect_uri=https%3A%2F%2Fid.vk.com%2Fabout%2Fbusiness%2Fgo&scope=email&lang_id=0&scheme=&oauth_version=2&redirect_state=39e688c2-38a0-471a-bb53-100f59397333&code_challenge=f7UfrtTCdc9OtT7BzrEBOMa0W6shap7hQMUvHC5scTw&code_challenge_method=sha256', steps, data);
}

module.exports = {
  registerOnPlatform,
  registerVK
};
async function registerTikTok(data) {
  const steps = [
    {
      selectors: {
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'select[name="birth_day"]': 'dob_day',
        'select[name="birth_month"]': 'dob_month',
        'select[name="birth_year"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://www.facebook.com/login.php?skip_api_login=1&api_key=1862952583919182&kid_directed_site=0&app_id=1862952583919182&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv18.0%2Fdialog%2Foauth%3Fapp_id%3D1862952583919182%26cbt%3D1720895722433%26channel_url%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Dff549417d1fbffd48%2526domain%253Dwww.tiktok.com%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fwww.tiktok.com%25252Ffbef1d21ff6ea2f7a%2526relation%253Dopener%26client_id%3D1862952583919182%26display%3Dpopup%26domain%3Dwww.tiktok.com%26e2e%3D%257B%257D%26fallback_redirect_uri%3Dhttps%253A%252F%252Fwww.tiktok.com%252Fsignup%26locale%3Den_US%26logger_id%3Df1649a9d208a5173e%26origin%3D1%26redirect_uri%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df8ea8c40454730f50%2526domain%253Dwww.tiktok.com%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fwww.tiktok.com%25252Ffbef1d21ff6ea2f7a%2526relation%253Dopener%2526frame%253Df7c398a60c876a5fb%26response_type%3Dtoken%252Csigned_request%252Cgraph_domain%26sdk%3Djoey%26version%3Dv18.0%26ret%3Dlogin%26fbapp_pres%3D0%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df8ea8c40454730f50%26domain%3Dwww.tiktok.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.tiktok.com%252Ffbef1d21ff6ea2f7a%26relation%3Dopener%26frame%3Df7c398a60c876a5fb%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied&display=popup&locale=ru_RU&pl_dbl=0', steps, data);
}

async function registerLinkedIn(data) {
  const steps = [
    {
      selectors: {
        'input[name="e-mail address"]': 'email',
        'input[name="password"]': 'password',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://www.linkedin.com/signup', steps, data);
}

async function registerYouTube(data) {
  const steps = [
    {
      selectors: {
        'input[name="firstName"]': 'name',
        'input[name="lastName"]': 'surname',
        'input[name="Username"]': 'username',
        'input[name="Passwd"]': 'password',
        'input[name="ConfirmPasswd"]': 'password',
      },
      submit: 'button[type="submit"]'
    },
    {
      selectors: {
        'input[name="phone"]': 'phone',
      },
      submit: 'button[type="submit"]'
    },
    {
      selectors: {
        'select[name="birth_day"]': 'dob_day',
        'select[name="birth_month"]': 'dob_month',
        'select[name="birth_year"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://accounts.google.com/signup', steps, data);
}

async function registerTelegram(data) {
  const steps = [
    {
      selectors: {
        'input[type="tel"]': 'phone',
      },
      submit: 'button[type="submit"]'
    },
    {
      selectors: {
        'input[name="verification_code"]': 'verification_code',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://oauth.telegram.org/auth?bot_id=531675494&origin=https%3A%2F%2Ftelegram.org&embed=1&request_access=write&return_to=https%3A%2F%2Ftelegram.org%2Fblog%2Flogin', steps, data);
}
async function registerMymir(data) {
  const steps = [
    {
      selectors: {
        'input[name="first_name"]': 'name',
        'input[name="last_name"]': 'surname',
        'select[name="birth_day"]': 'dob_day',
        'select[name="birth_month"]': 'dob_month',
        'select[name="birth_year"]': 'dob_year',
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'input[name="phone"]': 'phone',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://account.mail.ru/signup', steps, data);
}

module.exports = {
  registerOnPlatform,
  registerMymir,
  // other registration functions
};
async function registerOdnoklassniki(data) {
  const steps = [
    {
      selectors: {
        'input[name="first_name"]': 'name',
        'input[name="last_name"]': 'surname',
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'input[name="phone"]': 'phone',
        'select[name="bday"]': 'dob_day',
        'select[name="bmonth"]': 'dob_month',
        'select[name="byear"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://ok.ru/dk?st.cmd=anonymRegistrationEnterPhone', steps, data);
}

async function registerLikee(data) {
  const steps = [
    {
      selectors: {
        'input[name="first_name"]': 'name',
        'input[name="last_name"]': 'surname',
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'input[name="phone"]': 'phone',
        'select[name="bday"]': 'dob_day',
        'select[name="bmonth"]': 'dob_month',
        'select[name="byear"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://likee.video/', steps, data);
}

async function registerDiscord(data) {
  const steps = [
    {
      selectors: {
        'input[name="username"]': 'name',
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'select[name="birth_day"]': 'dob_day',
        'select[name="birth_month"]': `select[name="birth_month"] option[value="${data.dob_month}"]`,
        'select[name="birth_year"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://discord.com/register', steps, data);
}

async function registerSteam(data) {
  const steps = [
    {
      selectors: {
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'input[name="phone"]': 'phone',
        'select[name="birth_day"]': 'dob_day',
        'select[name="birth_month"]': 'dob_month',
        'select[name="birth_year"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://store.steampowered.com/join/', steps, data);
}

async function registerGmail(data) {
  const steps = [
    {
      selectors: {
        'input[name="firstName"]': 'name',
        'input[name="lastName"]': 'surname',
        'input[name="Username"]': 'username',
        'input[name="Passwd"]': 'password',
        'input[name="ConfirmPasswd"]': 'password',
      },
      submit: 'button[type="submit"]'
    },
    {
      selectors: {
        'input[name="phone"]': 'phone',
      },
      submit: 'button[type="submit"]'
    },
    {
      selectors: {
        'select[name="birth_day"]': 'dob_day',
        'select[name="birth_month"]': 'dob_month',
        'select[name="birth_year"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://accounts.google.com/signup', steps, data);
}

async function registerMailru(data) {
  const steps = [
    {
      selectors: {
        'input[name="firstName"]': 'name',
        'input[name="lastName"]': 'surname',
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'input[name="phone"]': 'phone',
        'select[name="birth_day"]': 'dob_day',
        'select[name="birth_month"]': 'dob_month',
        'select[name="birth_year"]': 'dob_year',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://account.mail.ru/signup', steps, data);
}

async function registerReddit(data) {
  const steps = [
    {
      selectors: {
        'input[name="email"]': 'email',
        'input[name="password"]': 'password',
        'input[name="username"]': 'username',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://www.reddit.com/register/', steps, data);
}

async function registerYandexzen(data) {
  const steps = [
    {
      selectors: {
        'input[name="firstname"]': 'name',
        'input[name="lastname"]': 'surname',
        'input[name="login"]': 'username',
        'input[name="password"]': 'password',
        'input[name="phone"]': 'phone'
      },
      submit: 'button[type="submit"]'
    },
    {
      // Assuming there's a second step for confirmation or additional data
      selectors: {
        'input[name="otp"]': 'verification_code' // if there's a verification code input
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://passport.yandex.com/registration', steps, data);
}

module.exports = {
  registerOnPlatform,
  registerYandexzen
};
async function registerWhatsapp(data) {
  const steps = [
    {
      selectors: {
        'input[name="phone"]': 'phone',
      },
      submit: 'button[type="submit"]'
    },
    {
      selectors: {
        'input[name="code"]': 'verification_code',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://web.whatsapp.com/', steps, data);
}
module.exports = {
  registerOnPlatform,
  registerWhatsapp,
};

async function registerViber(data) {
  const steps = [
    {
      selectors: {
        'input[name="phone"]': 'phone',
      },
      submit: 'button[type="submit"]'
    }
  ];
  await registerOnPlatform('https://www.viber.com/', steps, data);
}

async function registerHhru(data) {
  const steps = [
    {
     
        selectors: {
          'input[name="emailOrPhone"]': 'phone',
          
        },
        submit: 'button[type="submit"]'
      }
    ];
  await registerOnPlatform('https://hh.ru/account/signup', steps, data);
}

module.exports = {
  registerOnPlatform,
  registerHhru
};
module.exports = {
  registerFacebook,
  registerTwitter,
  registerInstagram,
  registerVK,
  registerTikTok,
  registerLinkedIn,
  registerYouTube,
  registerTelegram,
  registerMymir,
  registerOdnoklassniki,
  registerLikee,
  registerDiscord,
  registerSteam,
  registerGmail,
  registerMailru,
  registerReddit,
  registerYandexzen,
  registerWhatsapp,
  registerViber,
  registerHhru
};
