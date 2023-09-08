import Head from "next/head";
import CoreFeatureSection from "../components/CoreFeatureSection";
import FeaturesQualitySection from "../components/FeaturesQualitySection";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import PageLayout from "@/components/PageLayout";

export default function Home({ data }) {
  return (
    <>
      <PageLayout>
        <Head>
          <title>Gastroweb - Digitalize your business</title>
        </Head>

        <Hero />
        <CoreFeatureSection accordionData={data.accordion} />
        <FeaturesQualitySection featureQuality={data.featureQulity} />
        <Pricing pricing={data.pricing} />
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const data = {
    accordion: [
      {
        heading: "Discover",
        desc: 'Learn about our products scrolling down and comparing them in the "pricing" section',
      },
      {
        heading: "Register",
        desc: "Choose your plan and register to get access to your dashboard",
      },
      {
        heading: "Tell us more",
        desc: "Provide us all the necessary info we need through intuitive and accessible forms",
      },
      {
        heading: "Develop",
        desc: "Our team will work hard to combine all your info and return the best solution ever",
      },
      {
        heading: "Deploy",
        desc: "Wait few days and get a fully-tested and excellent product that will let you shine",
      },
    ],
    featureQulity: [
      {
        name: "Order and Delivery",
        icon: "../images/icons/budget.svg",
        heading: "Online shops, e-commerce and delivery app",
        desc: "Online solutions to grow and increase the sales in your activity. Create a unique experience for your customers and reach them directly at home with easy to use and accessible apps.",
        pic: "../images/delivery.jpg",
      },
      {
        name: "Kitchen Management",
        icon: "../images/icons/manage.svg",
        pic: "../images/kitchen.jpg",
        heading: "Manage order easily for the first time",
        desc: "Send, receive and update status of the orders in your restaurant. Create an easier and faster internal communication that will increase the happiness of your employees and reduce conflicts",
      },
      {
        name: "Staff Management",
        icon: "../images/icons/reports.svg",
        pic: "../images/staff.jpeg",
        heading: "Get a complete overview of your staff",
        desc: "With this service you will be able to create a database of your employees and easily consult it whenever you need. Provide your staff with users accounts and share with them what should they be aware of... as shift schedule, new policies, reclaims and much more ",
      },
      {
        name: "CRM Platform",
        icon: "../images/icons/optimize.svg",
        pic: "../images/crm.jpg",
        heading: "Personalize your own POS system ",
        desc: "Create your ideal version of a point-of-sale system choosing the features that you most like! Whether you want to monitor sales, make inventories, automate process or develop new ideas you can rely on us to get the best personalized product on the market ",
      },
    ],
    pricing: {
      monthly: [
        {
          id: 100,
          packName: "Menù and QR code",
          price: "$17.99/month",
          audience: "For a first approach to digitalization",
          benefits: [
            {
              name: "QR code generator",
              available: true,
            },
            {
              name: "Menù generator, with images and logo upload",
              available: true,
            },
            {
              name: "Custom Designs",
              available: true,
            },
            {
              name: "Website and Social Media Integration",
              available: true,
            },
            {
              name: "Online Reservation Tool",
              available: false,
            },
            {
              name: "12 Months of free hosting on a customized subdomain of the agency",
              available: true,
            },
          ],
        },
        {
          id: 200,
          packName: "Single Page Website",
          price: "$28.99/month",
          audience:
            "Clear and professional design web page to briefly introduce your business",
          benefits: [
            {
              name: '"Menù and QR code pack" included',
              available: true,
            },
            {
              name: "About Us",
              available: true,
            },
            {
              name: "Opening Hours",
              available: true,
            },
            {
              name: "Online Reservation Tool",
              available: false,
            },
            {
              name: "Image Gallery",
              available: true,
            },
          ],
        },
      ],
      annual: [
        {
          id: 101,
          packName: "Multiple Page Website",
          price: "$750 One Time",
          audience:
            "Clean Presentation on Separate Pages with a focus on details",
          benefits: [
            {
              name: '"Menù and QR code" pack included',
              available: true,
            },
            {
              name: '"Single Page Website" sections pack included and provided on different pages',
              available: true,
            },
            {
              name: "Multiple Languages Option with free translations provided in up to 3 languages",
              available: true,
            },
            {
              name: "2 years free hosting under our domains",
              available: true,
            },
            {
              name: "Online Reservation Tool",
              available: true,
            },
            {
              name: "Social, Seo and Maps integration",
              available: true,
            },
          ],
        },
        {
          id: 201,
          packName: "Functional Web App",
          price: "$1300 One time",
          audience:
            "Choose one of the following packages to improve your operations",
          benefits: [
            {
              name: "Order Delivery App",
              available: true,
            },
            {
              name: "Kitchen Order Management App",
              available: true,
            },
            {
              name: "CRM Platform for Managers",
              available: true,
            },
            {
              name: "Staff Management App",
              available: true,
            },
            {
              name: "E-commerce",
              available: true,
            },
          ],
        },
      ],
    },
  };

  return {
    props: {
      data,
    },
  };
}
