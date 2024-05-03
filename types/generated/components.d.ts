import type { Schema, Attribute } from '@strapi/strapi';

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
  };
  attributes: {
    value: Attribute.String;
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
      'variations.options': VariationsOptions;
      'variations.values': VariationsValues;
      'variations.variants': VariationsVariants;
      'variations.voptions': VariationsVoptions;
    }
  }
}
