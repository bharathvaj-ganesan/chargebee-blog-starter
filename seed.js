require('dotenv').config({ path: '.env.local' });
const chargebee = require('chargebee');

console.log(process.env.NEXT_PUBLIC_CHARGEBEE_DOMAIN);

// Set your Chargebee API key and site name
chargebee.configure({
  site: process.env.NEXT_PUBLIC_CHARGEBEE_DOMAIN,
  api_key: process.env.CHARGEBEE_API_KEY,
});

async function createProductFamilyAndPlans() {
  try {
    // Create product family
    await chargebee.item_family
      .create({
        id: 'blog',
        name: 'Blog',
        description: 'My blog platform',
      })
      .request();

    // Create Free plan
    await chargebee.item
      .create({
        item_family_id: 'blog',
        id: 'free',
        name: 'Free',
        type: 'plan',
        description: 'Free blog plan',
      })
      .request();

    await chargebee.item_price
      .create({
        id: 'free-USD-monthly',
        item_id: 'free',
        name: 'free USD monthly',
        pricing_model: 'flat_fee',
        price: 0,
        external_name: 'Free',
        period_unit: 'month',
        period: 1,
      })
      .request();

    // Create Premium plan
    await chargebee.item
      .create({
        item_family_id: 'blog',
        id: 'premium',
        name: 'Premium',
        type: 'plan',
        description: 'Premium blog plan',
      })
      .request();

    await chargebee.item_price
      .create({
        id: 'premium-USD-monthly',
        item_id: 'premium',
        name: 'premium USD monthly',
        pricing_model: 'flat_fee',
        price: 49900,
        external_name: 'Premium',
        period_unit: 'month',
        period: 1,
      })
      .request();

    console.log('Product family and plans created successfully!');
  } catch (error) {
    console.error(error);
  }
}

createProductFamilyAndPlans();
