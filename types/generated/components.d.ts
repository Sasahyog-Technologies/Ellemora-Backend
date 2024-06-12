import type { Schema, Attribute } from '@strapi/strapi';

export interface BodyMeasurementBodyMeasurement extends Schema.Component {
  collectionName: 'components_body_measurement_body_measurements';
  info: {
    displayName: 'body measurement';
    icon: 'archive';
  };
  attributes: {
    topLength: Attribute.String;
    shoulder: Attribute.String;
    armhole: Attribute.String;
    acrossBack: Attribute.String;
    UpperBustAcrossFront: Attribute.String;
    bust: Attribute.String;
    underBust: Attribute.String;
    shoulderToApex: Attribute.String;
    ArmElbowWrist: Attribute.String;
    lowWaist: Attribute.String;
    waist: Attribute.String;
    shoulderToHip: Attribute.String;
    hip: Attribute.String;
    shoulderToWaist: Attribute.String;
    collar: Attribute.String;
    NeckFB: Attribute.String;
    thigh: Attribute.String;
    knee: Attribute.String;
    calf: Attribute.String;
    waistToThigh: Attribute.String;
    waistToKnee: Attribute.String;
    waistToCalf: Attribute.String;
    waistToAnkle: Attribute.String;
    fullbodyLength: Attribute.String;
  };
}

export interface SlidesSlides extends Schema.Component {
  collectionName: 'components_slides_slides';
  info: {
    displayName: 'slides';
    description: '';
  };
  attributes: {
    link: Attribute.String;
    media: Attribute.Media;
    mobileMedia: Attribute.Media;
    mobileLink: Attribute.String;
  };
}

export interface VariationsColorImages extends Schema.Component {
  collectionName: 'components_variations_color_images';
  info: {
    displayName: 'ColorImages';
  };
  attributes: {
    name: Attribute.String;
    media: Attribute.Media;
  };
}

export interface VariationsOptions extends Schema.Component {
  collectionName: 'components_variations_options';
  info: {
    displayName: 'options';
    icon: 'bulletList';
  };
  attributes: {
    option: Attribute.String;
    values: Attribute.Component<'variations.values', true>;
  };
}

export interface VariationsValues extends Schema.Component {
  collectionName: 'components_variations_values';
  info: {
    displayName: 'values';
    icon: 'apps';
    description: '';
  };
  attributes: {
    value: Attribute.String;
    code: Attribute.String;
  };
}

export interface VariationsVariants extends Schema.Component {
  collectionName: 'components_variations_variants';
  info: {
    displayName: 'variants';
    icon: 'database';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    SKU: Attribute.String;
    barcode: Attribute.String;
    variantRank: Attribute.BigInteger;
    inventoryQuantity: Attribute.BigInteger;
    originCountry: Attribute.String;
    material: Attribute.String;
    weight: Attribute.BigInteger;
    length: Attribute.BigInteger;
    height: Attribute.BigInteger;
    width: Attribute.BigInteger;
    price: Attribute.BigInteger;
    thumbnail: Attribute.Media;
    media: Attribute.Media;
    voptions: Attribute.Component<'variations.voptions'>;
    slug: Attribute.UID & Attribute.CustomField<'plugin::field-uuid.uuid'>;
  };
}

export interface VariationsVoptions extends Schema.Component {
  collectionName: 'components_variations_voptions';
  info: {
    displayName: 'voptions';
  };
  attributes: {
    option: Attribute.String;
    value: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'body-measurement.body-measurement': BodyMeasurementBodyMeasurement;
      'slides.slides': SlidesSlides;
      'variations.color-images': VariationsColorImages;
      'variations.options': VariationsOptions;
      'variations.values': VariationsValues;
      'variations.variants': VariationsVariants;
      'variations.voptions': VariationsVoptions;
    }
  }
}
