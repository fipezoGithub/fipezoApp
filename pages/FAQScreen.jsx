import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {vw} from 'react-native-viewport-units';
import FAQAccordian from '../components/FAQAccordian';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FAQScreen = ({navigation}) => {
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const [showFreelancerAccount, setShowFreelancerAccount] = useState(false);
  const [showCompanyAccount, setShowCompanyAccount] = useState(false);
  const [showAccountVerification, setShowAccountVerification] = useState(false);
  const [showReferAndEarnProgramme, setShowReferAndEarnProgramme] =
    useState(false);
  const [showPrivacyAndSecurity, setShowPrivacyAndSecurity] = useState(false);
  const [showLegalAndTerms, setShowLegalAndTerms] = useState(false);
  const [showHelpAndSupport, setShowHelpAndSupport] = useState(false);

  const gettingStartedData = [
    {
      q: 'What is Fipezo?',
      a: 'Fipezo is an online freelance platform that connects freelancers with clients or companies seeking various services.',
    },
    {
      q: 'How do I sign up on Fipezo?',
      a: 'Fipezo is an online freelance platform that connects freelancers with clients or companies seeking various services.',
    },
    {
      q: 'How do I sign up on Fipezo?',
      a: 'Step 1: Click "Get Started" Go to the Fipezo homepage. \n Step 2: Select Your User Type - Choose whether you are a freelancer or a client. \n Step 3:  Provide Your Information - Fill in your details to create a profile, showcasing your skills and expertise',
    },
    {
      q: 'How can I search for freelance jobs?',
      a: 'Users can find freelance jobs on Fipezo by visiting the "Browse Jobs" section, where they can explore job listings in different categories.',
    },
    {
      q: 'Can companies use Fipezo to find freelancers for their projects?',
      a: 'Yes, companies can join Fipezo to discover and hire freelancers for their projects and collaborate on various tasks.',
    },
    {
      q: 'What are the benefits of using Fipezo?',
      a: 'Fipezo provides a wealth of advantages, such as freelance job access, flexible work options, networking with clients and freelancers, secure payments, reputation building through reviews, diverse services, reliable support, global reach, efficient project management, and a supportive community.',
    },
    {
      q: 'Is it free to use Fipezo as a freelancer or Company ?',
      a: 'You can join Fipezo and set up your profile without any charges. It&apos;s worth mentioning that the fundamental usage of the platform is completely free of cost',
    },
  ];

  const freelancerAccount = [
    {
      q: 'How do I sign up on Fipezo as a freelancer?',
      a: 'To sign up as a freelancer on Fipezo, click the "Getting Started" button on the homepage, provide your information, and create a profile showcasing your skills and expertise.',
    },
    {
      q: 'How do I create a Perfect freelancer profile?',
      a: 'Profile Picture:Start with a clear and friendly profile picture. A professional headshot or a high-quality image of yourself works well.\nIntroduction: Write a brief and engaging introduction about yourself. Mention your skills, experience, and what makes you unique. \nPortfolio: Showcase your work through a portfolio. Add samples, projects, or links to your previous projects to demonstrate your capabilities. \nSkills and Expertise: List your skills and areas of expertise. Be specific about what you can offer. \nRates and Availability: Specify your per day or project rates, and let clients know when you&apos;re available to work. \nReviews and Ratings: As you complete projects, encourage clients to leave reviews and ratings, which can enhance your credibility. \nProfessionalism: Maintain professionalism in your communication and interactions with clients on the platform.',
    },
    {
      q: 'Can I offer any type of freelance service ?',
      a: 'On Fipezo, freelancers can provide a range of services like design, writing, photography, and modeling. While the platform offers some predefined services, freelancers can also request to add their own services to their profile.',
    },
    {
      q: 'How do I set my rates and payment preferences?',
      a: 'Freelancers have the flexibility to determine their rates on Fipezo based on the quality of their work, the cost of equipment used for projects, and other factors that influence their pricing. It&apos;s important to note that rates can differ between per-day and per-project arrangements, allowing freelancers to adapt their pricing to the specific needs of each project and client. This flexibility ensures that freelancers can align their rates with the scope and requirements of the work they undertake.',
    },
    {
      q: 'How do I get paid for freelance work ?',
      a: 'Payment details and methods vary by project and are typically agreed upon between the freelancer and the client. Fipezo does not process payments directly.',
    },
  ];

  const companyAccount = [
    {
      q: 'How to signup as a company on Fipezo ?',
      a: 'Step 1: Go to homepage and click on "Get Started" button and choose your category as company. \n Step 2: Provide company name and number and verify your OTP. \n Step 3: After verification, complete your company profile by adding information about your services, team, and any other relevant details.',
    },
    {
      q: 'How do I post a job as a client ?',
      a: 'Certainly, here\'s the step-by-step guide with the information incorporated: \nStep 1: Log in to your Fipezo company account.\nStep 2: Access your dashboard. \nStep 3: Click<span class="font-bold">"Post a Job."</span> \nStep 4: Provide job details, budget, location and timeline. \nStep 5: Review and confirm the job posting. \nStep 6: Wait for freelancer proposals.',
    },
    {
      q: 'How can I search for freelancers ?',
      a: "You can search for freelancers on Fipezo by using the platform's search bar and applying filters to refine your search results. This allows you to find freelancers with specific skills and expertise that match your project requirements.</p>",
    },
    {
      q: 'What information should I include in a job listing?',
      a: "When creating a job listing on Fipezo, it's essential to include key information to attract the right freelancers. Include details such as: \n \nJob Title: A clear and descriptive title for your project. \n Job Description:</span>A thorough description of the project, its goals, and any specific requirements. \nSkills Needed:</span>List the skills or expertise required for the job. \nBudget: Specify the budget for the project, whether it's a fixed amount or a range. \nTimeline: Mention the project's expected start and completion dates. \nLocation: Indicate if the project is location-specific or remote. \n \nBy providing this information, you'll help freelancers understand the scope of the job and apply with relevant proposals.\n",
    },
  ];

  const accountVerification = [
    {
      q: 'Is account verification required on Fipezo?',
      a: "Account verification on Fipezo isn't mandatory for browsing the platform. You can explore the website without it. However, when you want to post a job or hire a freelancer, it's advisable to complete the verification process first. This extra step fosters trust and security in your freelance interactions.",
    },
    {
      q: 'What documents or information may be needed for verification?',
      a: "As of now, Fipezo's verification process doesn't require legal identification documents. Users are asked to provide their basic details to complete the verification, ensuring a straightforward and accessible experience on the platform. Your privacy and security are important to us, and we strive to make the process as simple as possible.",
    },
    {
      q: 'How long does the verification process typically take?',
      a: "Fipezo's verification process usually takes around 24 hours, ensuring a speedy experience for users.",
    },
    {
      q: 'What are the benefits of having a verified account?',
      a: 'The advantages of having a verified account on Fipezo include enhanced trust and credibility, which can make it easier to attract clients or freelancers and engage in secure transactions. Verified accounts enjoy a higher level of trust within the community, ultimately improving the overall freelancing experience. Your satisfaction and peace of mind are key.',
    },
  ];

  const referAndEarnProgramme = [
    {
      q: 'What is the Fipezo Refer and Earn program?',
      a: 'The Fipezo Refer and Earn program is a referral program that allows you to invite your freelancer friends, colleagues, or other contacts to join Fipezo. When they sign up and create their freelance profile on the platform, you can earn rewards.',
    },
    {
      q: 'How can I participate in the Refer and Earn program?',
      a: 'To participate, you need to be a registered user on Fipezo. You can find your unique referral code in your refer and earn page, which you can share with others freelancers.',
    },
    {
      q: 'What rewards can I earn through the program?',
      a: "By referring someone to create a freelance profile on Fipezo, you can earn 50 rupees as a reward. It's a straightforward way to benefit from your referrals' involvement in the platform.",
    },
    {
      q: 'Is there a limit to how many people I can refer?',
      a: 'There is often no limit to the number of people you can refer. You can refer as many people as you like, and for each successful referral, you can earn rewards.',
    },
    {
      q: 'When do I receive my referral rewards?',
      a: "You'll receive your referral rewards after getting 6 successful referrals. That's when you can withdraw your rewards.",
    },
    {
      q: 'How can I track my referrals and rewards?',
      a: "You can often track your referrals and rewards through your Fipezo account. The platform typically provides a dashboard where you can see the status of your referrals and the rewards you've earned.",
    },
    {
      q: 'Are there any restrictions on who I can refer?',
      a: 'There are limitations on who you can refer. The referral program is solely for freelancers who create new accounts using the referral code. No rewards are provided for clients or companies creating accounts.',
    },
    {
      q: 'How I can withdraw my referral reward?',
      a: 'To withdraw your referral reward, use UPI as the payment method. After meeting the required number of successful referrals, you can easily request your payout.',
    },
  ];

  const privacyAndSecurity = [
    {
      q: 'How is my personal information protected on Fipezo?',
      a: 'Fipezo takes your personal information protection seriously. Your data is safeguarded through strong security measures and encryption to ensure your privacy and safety on the platform.',
    },
    {
      q: 'What security measures are in place for transactions?',
      a: "Fipezo prioritizes your transaction security. As of now, Fipezo does not handle or enter transactions made on the platform. Rates are determined by freelancers, and clients decide what they're willing to pay. Your financial dealings are between you and the other party, and your data is kept safe with robust security measures.",
    },
    {
      q: 'How can I report any security concerns or fraudulent activity?',
      a: 'If you come across security concerns or suspect fraudulent activity on Fipezo, we encourage you to report them immediately. You can use our reporting tools, typically found on the platform, to alert our team to any issues. Your report helps us maintain a secure environment for all users. Your privacy and security are our top priorities.',
    },
    {
      q: 'Can Freelancers use their contact number on Fipezo?',
      a: 'Freelancers on Fipezo cannot display their contact number on the platform, but their contact information is stored securely in our database for communication and transaction purposes. Your privacy and security are important to us.',
    },
  ];

  const legalAndTerms = [
    {
      q: 'What are the terms of service and user agreements?',
      a: "The terms of service and user agreements on Fipezo outline the guidelines and rules for using our platform. By agreeing to these terms, you commit to following our community's standards and practices, ensuring a safe and trusted environment for all users. It's important to review and understand these terms to maintain a positive experience on Fipezo. Your satisfaction and security are of utmost importance to us.",
    },
    {
      q: "How are disputes and conflicts handled in accordance with Fipezo's policies?",
      a: 'Fipezo has a process in place for managing disputes and conflicts based on our policies. When issues arise, both freelancers and clients can follow the prescribed steps to reach a resolution. This process is designed to be fair and impartial, promoting a peaceful and productive freelance environment for all users. Your satisfaction and trust are paramount.',
    },
    {
      q: 'What are the legal obligations for freelancers and clients?',
      a: 'Fipezo sets clear rules for freelancers and clients to follow. By using the platform, you agree to these rules, which ensure fairness and honesty in your freelance interactions. Complying with these rules is important for a straightforward and reliable experience on Fipezo, making the platform a safe place for everyone.',
    },
  ];

  const helpAndSupport = [
    {
      q: 'How can I edit or update my profile information?',
      a: "To edit or update your profile information on Fipezo, you can typically access your account settings or profile settings. There, you'll find options to make changes to your details, skills, and other profile information.",
    },
    {
      q: 'Can I change my username or email address?',
      a: "Changing your username or email address may be possible in your account settings. Review the platform's specific guidelines for making such changes, as they can vary.",
    },
    {
      q: "What should I do if I forget my password or can't log in?",
      a: "Changing your username or email address may be possible in your account settings. Review the platform's specific guidelines for making such changes, as they can vary.",
    },
    {
      q: "What should I do if I forget my password or can't log in?",
      a: 'If you forget your password or have trouble logging in, Fipezo often provides a "Forgot Password" or Trouble Logging In" feature. Use this to reset your password or regain access to your account.',
    },
    {
      q: "How can I contact Fipezo's support team for assistance?",
      a: "To contact Fipezo's support team for assistance, you can typically use the contact options available on the platform, such as the Help or Support section. \n Email us on : help@fipezo.com",
    },
    {
      q: " How do I report issues or violations of Fipezo's policies?",
      a: 'If you come across any problems or spot policy violations on Fipezo, you can go to the help or support team to report them. This helps in keeping the platform safe and secure for all users, and your concerns and questions will be promptly addressed.',
    },
  ];

  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={{
        backgroundColor: '#fff',
        alignItems: 'center',
        rowGap: 5 * vw,
      }}>
      <View className="pt-6">
        <Text style={{fontSize: 6 * vw}} className="font-bold text-black">
          Need any Help? We've got to you.
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showGettingStarted ? 'border-orange-500' : '')
          }
          onPress={() => {
            setShowGettingStarted(true);
            setShowFreelancerAccount(false);
            setShowCompanyAccount(false);
            setShowAccountVerification(false);
            setShowReferAndEarnProgramme(false);
            setShowPrivacyAndSecurity(false);
            setShowLegalAndTerms(false);
            setShowHelpAndSupport(false);
          }}>
          <Text
            className={
              'font-medium capitalize ' +
              (showGettingStarted ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            getting started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowGettingStarted(false);
            setShowFreelancerAccount(true);
            setShowCompanyAccount(false);
            setShowAccountVerification(false);
            setShowReferAndEarnProgramme(false);
            setShowPrivacyAndSecurity(false);
            setShowLegalAndTerms(false);
            setShowHelpAndSupport(false);
          }}
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showFreelancerAccount ? 'border-orange-500' : '')
          }>
          <Text
            className={
              'font-medium capitalize ' +
              (showFreelancerAccount ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            freelancer account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowGettingStarted(false);
            setShowFreelancerAccount(false);
            setShowCompanyAccount(true);
            setShowAccountVerification(false);
            setShowReferAndEarnProgramme(false);
            setShowPrivacyAndSecurity(false);
            setShowLegalAndTerms(false);
            setShowHelpAndSupport(false);
          }}
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showCompanyAccount ? 'border-orange-500' : '')
          }>
          <Text
            className={
              'font-medium capitalize ' +
              (showCompanyAccount ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            company account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowGettingStarted(false);
            setShowFreelancerAccount(false);
            setShowCompanyAccount(false);
            setShowAccountVerification(true);
            setShowReferAndEarnProgramme(false);
            setShowPrivacyAndSecurity(false);
            setShowLegalAndTerms(false);
            setShowHelpAndSupport(false);
          }}
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showAccountVerification ? 'border-orange-500' : '')
          }>
          <Text
            className={
              'font-medium capitalize ' +
              (showAccountVerification ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            account verification
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowGettingStarted(false);
            setShowFreelancerAccount(false);
            setShowCompanyAccount(false);
            setShowAccountVerification(false);
            setShowReferAndEarnProgramme(true);
            setShowPrivacyAndSecurity(false);
            setShowLegalAndTerms(false);
            setShowHelpAndSupport(false);
          }}
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showReferAndEarnProgramme ? 'border-orange-500' : '')
          }>
          <Text
            className={
              'font-medium capitalize ' +
              (showReferAndEarnProgramme ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            refer and earn program
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowGettingStarted(false);
            setShowFreelancerAccount(false);
            setShowCompanyAccount(false);
            setShowAccountVerification(false);
            setShowReferAndEarnProgramme(false);
            setShowPrivacyAndSecurity(true);
            setShowLegalAndTerms(false);
            setShowHelpAndSupport(false);
          }}
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showPrivacyAndSecurity ? 'border-orange-500' : '')
          }>
          <Text
            className={
              'font-medium capitalize ' +
              (showPrivacyAndSecurity ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            Privacy and Security
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowGettingStarted(false);
            setShowFreelancerAccount(false);
            setShowCompanyAccount(false);
            setShowAccountVerification(false);
            setShowReferAndEarnProgramme(false);
            setShowPrivacyAndSecurity(false);
            setShowLegalAndTerms(true);
            setShowHelpAndSupport(false);
          }}
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showLegalAndTerms ? 'border-orange-500' : '')
          }>
          <Text
            className={
              'font-medium capitalize ' +
              (showLegalAndTerms ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            Legal and Terms
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowGettingStarted(false);
            setShowFreelancerAccount(false);
            setShowCompanyAccount(false);
            setShowAccountVerification(false);
            setShowReferAndEarnProgramme(false);
            setShowPrivacyAndSecurity(false);
            setShowLegalAndTerms(false);
            setShowHelpAndSupport(true);
          }}
          className={
            'mx-2 px-2 py-1 border rounded-lg ' +
            (showHelpAndSupport ? 'border-orange-500' : '')
          }>
          <Text
            className={
              'font-medium capitalize ' +
              (showHelpAndSupport ? 'text-orange-500' : 'text-black')
            }
            style={{fontSize: 4.5 * vw}}>
            Help and Support
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View className="flex flex-col items-stretch">
        {showGettingStarted &&
          gettingStartedData.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}

        {showFreelancerAccount &&
          freelancerAccount.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}

        {showCompanyAccount &&
          companyAccount.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}

        {showAccountVerification &&
          accountVerification.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}

        {showReferAndEarnProgramme &&
          referAndEarnProgramme.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}

        {showPrivacyAndSecurity &&
          privacyAndSecurity.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}

        {showLegalAndTerms &&
          legalAndTerms.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}

        {showHelpAndSupport &&
          helpAndSupport.map((item, index) => (
            <FAQAccordian
              key={index}
              data={item}
              expand={index === 0 ? true : false}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({});
