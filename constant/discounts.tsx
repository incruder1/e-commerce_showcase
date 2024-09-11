export const DISCOUNT_TYPES = {
    PERCENTAGE: "percentage",
    FLAT: "flat",
  };
  
  export const discountData = [
    {
      code: "DEV",
      discountType: DISCOUNT_TYPES.PERCENTAGE,
      discount: 50,
    },
    {
      code: "OFF20",
      discountType: DISCOUNT_TYPES.PERCENTAGE,
      discount: 20,
    },
    {
      code: "HBD26",
      discountType: DISCOUNT_TYPES.FLAT,
      discount: 200,
    },
  ];
  