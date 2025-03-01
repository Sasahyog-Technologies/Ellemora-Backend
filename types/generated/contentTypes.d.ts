import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    mobileNumber: Attribute.String;
    fullName: Attribute.String;
    addresses: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::address.address'
    >;
    wishlists: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::wishlist.wishlist'
    >;
    birthdate: Attribute.Date;
    profile: Attribute.Media;
    orders: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::order.order'
    >;
    dob: Attribute.String;
    anniversary: Attribute.String;
    gender: Attribute.String;
    tikets: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::tiket.tiket'
    >;
    userEmail: Attribute.Email & Attribute.Unique;
    superCoins: Attribute.BigInteger &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      >;
    wallet: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::wallet.wallet'
    >;
    User: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::utm-tracking.utm-tracking'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAddressAddress extends Schema.CollectionType {
  collectionName: 'addresses';
  info: {
    singularName: 'address';
    pluralName: 'addresses';
    displayName: 'Address ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstName: Attribute.String;
    lastName: Attribute.String;
    streetAddress: Attribute.String;
    zipCode: Attribute.String;
    city: Attribute.String;
    state: Attribute.String;
    country: Attribute.String;
    mobileNumber: Attribute.String;
    label: Attribute.String;
    user: Attribute.Relation<
      'api::address.address',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAddtionalAddtional extends Schema.CollectionType {
  collectionName: 'addtionals';
  info: {
    singularName: 'addtional';
    pluralName: 'addtionals';
    displayName: 'Addtional';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fit: Attribute.String;
    length: Attribute.String;
    sleeveTypes: Attribute.String;
    neckLine: Attribute.String;
    components: Attribute.String;
    numberOfComponents: Attribute.String;
    febric: Attribute.String;
    typeOfWork: Attribute.String;
    care: Attribute.String;
    disclaimer: Attribute.Text;
    shippingDisclaimer: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::addtional.addtional',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::addtional.addtional',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerBanner extends Schema.CollectionType {
  collectionName: 'banners';
  info: {
    singularName: 'banner';
    pluralName: 'banners';
    displayName: 'Banner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
    link: Attribute.String;
    type: Attribute.Enumeration<['large', 'small']>;
    Image2: Attribute.Media;
    slides: Attribute.Component<'slides.slides', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCartCart extends Schema.CollectionType {
  collectionName: 'carts';
  info: {
    singularName: 'cart';
    pluralName: 'carts';
    displayName: 'Cart';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    product: Attribute.Relation<
      'api::cart.cart',
      'oneToOne',
      'api::product.product'
    >;
    productVariant: Attribute.Relation<
      'api::cart.cart',
      'oneToOne',
      'api::product-variant.product-variant'
    >;
    user: Attribute.Relation<
      'api::cart.cart',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    quantity: Attribute.Integer;
    isNotified: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    thumbnail: Attribute.Media;
    products: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::product.product'
    >;
    slug: Attribute.UID<'api::category.category', 'name'>;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCollectionCollection extends Schema.CollectionType {
  collectionName: 'collections';
  info: {
    singularName: 'collection';
    pluralName: 'collections';
    displayName: 'Collection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    thumbnail: Attribute.Media;
    slug: Attribute.UID<'api::collection.collection', 'name'>;
    down: Attribute.Boolean;
    categories: Attribute.Relation<
      'api::collection.collection',
      'oneToMany',
      'api::category.category'
    >;
    isCategory: Attribute.Boolean & Attribute.DefaultTo<false>;
    desktopOnly: Attribute.Boolean & Attribute.DefaultTo<true>;
    style: Attribute.Enumeration<['normal', 'styled']>;
    products: Attribute.Relation<
      'api::collection.collection',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiComissionComission extends Schema.SingleType {
  collectionName: 'comissions';
  info: {
    singularName: 'comission';
    pluralName: 'comissions';
    displayName: 'Comission';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comissions: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::comission.comission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::comission.comission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConversionConversion extends Schema.SingleType {
  collectionName: 'conversions';
  info: {
    singularName: 'conversion';
    pluralName: 'conversions';
    displayName: 'Conversion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    currencies: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::conversion.conversion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::conversion.conversion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountryCountry extends Schema.CollectionType {
  collectionName: 'countries';
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Country';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    percentage: Attribute.Float;
    currency: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCoupanCoupan extends Schema.CollectionType {
  collectionName: 'coupans';
  info: {
    singularName: 'coupan';
    pluralName: 'coupans';
    displayName: 'Coupan';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    type: Attribute.Enumeration<
      ['MoreThanOrderItems', 'MoreThanPrice', 'MinThanOrders']
    >;
    targetValue: Attribute.BigInteger;
    startDate: Attribute.DateTime;
    endDate: Attribute.DateTime;
    discountType: Attribute.Enumeration<['flat', 'percentage']>;
    discountValue: Attribute.BigInteger;
    selected: Attribute.Boolean & Attribute.DefaultTo<false>;
    code: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coupan.coupan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coupan.coupan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomCustom extends Schema.CollectionType {
  collectionName: 'customs';
  info: {
    singularName: 'custom';
    pluralName: 'customs';
    displayName: 'custom';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    temp: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::custom.custom',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::custom.custom',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomizationCustomization extends Schema.CollectionType {
  collectionName: 'customizations';
  info: {
    singularName: 'customization';
    pluralName: 'customizations';
    displayName: 'Customization';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fullName: Attribute.String;
    mobile: Attribute.String;
    ocassion: Attribute.String;
    style: Attribute.String;
    budget: Attribute.BigInteger;
    preferredDate: Attribute.DateTime;
    requestMedia: Attribute.Media;
    callVerification: Attribute.Boolean;
    linkSended: Attribute.Boolean;
    detailsConfimation: Attribute.Boolean;
    detailConfimationStatus: Attribute.String;
    firstHalfPaymentConfirmation: Attribute.Boolean;
    bodyMeasurement: Attribute.Component<'body-measurement.body-measurement'>;
    responseMedia: Attribute.Media;
    comments: Attribute.String;
    styleMedia: Attribute.Media;
    colorMedia: Attribute.Media;
    febricMedia: Attribute.Media;
    printMedia: Attribute.Media;
    cost: Attribute.BigInteger;
    percentageOfPayment: Attribute.BigInteger;
    currency: Attribute.String;
    email: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customization.customization',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customization.customization',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiscountTrackDiscountTrack extends Schema.CollectionType {
  collectionName: 'discount_tracks';
  info: {
    singularName: 'discount-track';
    pluralName: 'discount-tracks';
    displayName: 'Discount Track';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    user: Attribute.Relation<
      'api::discount-track.discount-track',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    coupan: Attribute.Relation<
      'api::discount-track.discount-track',
      'oneToOne',
      'api::coupan.coupan'
    >;
    promocode: Attribute.Relation<
      'api::discount-track.discount-track',
      'oneToOne',
      'api::promocode.promocode'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::discount-track.discount-track',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::discount-track.discount-track',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGiftcardGiftcard extends Schema.CollectionType {
  collectionName: 'giftcards';
  info: {
    singularName: 'giftcard';
    pluralName: 'giftcards';
    displayName: 'Giftcard';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    balance: Attribute.Integer & Attribute.DefaultTo<0>;
    expiryDate: Attribute.Date;
    isActive: Attribute.Boolean;
    isRedeemed: Attribute.Boolean;
    createdByUser: Attribute.Relation<
      'api::giftcard.giftcard',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    template: Attribute.Relation<
      'api::giftcard.giftcard',
      'oneToOne',
      'api::giftcard-template.giftcard-template'
    >;
    transection: Attribute.Relation<
      'api::giftcard.giftcard',
      'oneToOne',
      'api::transection.transection'
    >;
    code: Attribute.UID & Attribute.CustomField<'plugin::field-uuid.uuid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::giftcard.giftcard',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::giftcard.giftcard',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGiftcardTemplateGiftcardTemplate
  extends Schema.CollectionType {
  collectionName: 'giftcard_templates';
  info: {
    singularName: 'giftcard-template';
    pluralName: 'giftcard-templates';
    displayName: 'Giftcard Template';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    thumbnail: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::giftcard-template.giftcard-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::giftcard-template.giftcard-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNotificationNotification extends Schema.CollectionType {
  collectionName: 'notifications';
  info: {
    singularName: 'notification';
    pluralName: 'notifications';
    displayName: 'Notification';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vars: Attribute.JSON;
    label: Attribute.String;
    template_name: Attribute.String;
    type: Attribute.Enumeration<
      [
        'pending pickup',
        'in transit',
        'exception',
        'out for delivery',
        'delivered',
        'rto',
        'rto in transit',
        'rto delivered'
      ]
    >;
    expiration_date: Attribute.Date;
    oid: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'Order';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    firstName: Attribute.String;
    lastName: Attribute.String;
    streetAddress: Attribute.String;
    zipCode: Attribute.String;
    city: Attribute.String;
    state: Attribute.String;
    country: Attribute.String;
    mobileNumber: Attribute.String;
    status: Attribute.String;
    type: Attribute.String;
    items: Attribute.Relation<
      'api::order.order',
      'oneToMany',
      'api::order-item.order-item'
    >;
    user: Attribute.Relation<
      'api::order.order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    request_auto_pickup: Attribute.Boolean;
    order_amount: Attribute.Decimal;
    payment_type: Attribute.String;
    package_length: Attribute.Decimal;
    package_breadth: Attribute.Decimal;
    package_height: Attribute.Decimal;
    cod_charges: Attribute.Decimal;
    shipping_charges: Attribute.Decimal;
    courier_id: Attribute.String;
    isInsurance: Attribute.Boolean;
    orderId: Attribute.String;
    shipmentId: Attribute.String;
    awbNumber: Attribute.String;
    courierName: Attribute.String;
    additionalInfo: Attribute.String;
    manifes: Attribute.String;
    quantity: Attribute.BigInteger;
    package_weight: Attribute.Decimal;
    tickets: Attribute.Relation<
      'api::order.order',
      'oneToMany',
      'api::tiket.tiket'
    >;
    payment: Attribute.Relation<
      'api::order.order',
      'manyToOne',
      'api::payment.payment'
    >;
    currencyCode: Attribute.String;
    uuid: Attribute.UID & Attribute.CustomField<'plugin::field-uuid.uuid'>;
    group: Attribute.Relation<
      'api::order.order',
      'manyToOne',
      'api::order-group.order-group'
    >;
    codCollectionDate: Attribute.DateTime;
    codPaymentReference: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderGroupOrderGroup extends Schema.CollectionType {
  collectionName: 'order_groups';
  info: {
    singularName: 'order-group';
    pluralName: 'order-groups';
    displayName: 'Order Group';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    orders: Attribute.Relation<
      'api::order-group.order-group',
      'oneToMany',
      'api::order.order'
    >;
    user: Attribute.Relation<
      'api::order-group.order-group',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    payment: Attribute.Relation<
      'api::order-group.order-group',
      'oneToOne',
      'api::payment.payment'
    >;
    transection: Attribute.Relation<
      'api::order-group.order-group',
      'oneToOne',
      'api::transection.transection'
    >;
    status: Attribute.Enumeration<
      ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']
    >;
    trackingDetails: Attribute.JSON;
    expectedDeliveryDate: Attribute.DateTime;
    currency: Attribute.String;
    shippingLabel: Attribute.String;
    orderNumber: Attribute.String & Attribute.Unique;
    totalAmount: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order-group.order-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order-group.order-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderItemOrderItem extends Schema.CollectionType {
  collectionName: 'order_items';
  info: {
    singularName: 'order-item';
    pluralName: 'order-items';
    displayName: 'Order Item';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    product: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'api::product.product'
    >;
    productVariant: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'api::product-variant.product-variant'
    >;
    order: Attribute.Relation<
      'api::order-item.order-item',
      'manyToOne',
      'api::order.order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentPayment extends Schema.CollectionType {
  collectionName: 'payments';
  info: {
    singularName: 'payment';
    pluralName: 'payments';
    displayName: 'Payment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    paymentId: Attribute.String;
    paymentType: Attribute.String;
    user: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    orders: Attribute.Relation<
      'api::payment.payment',
      'oneToMany',
      'api::order.order'
    >;
    status: Attribute.String;
    customizationId: Attribute.BigInteger;
    label: Attribute.String;
    amount: Attribute.Float;
    type: Attribute.Enumeration<['order', 'customization']>;
    orderGroup: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'api::order-group.order-group'
    >;
    currency: Attribute.String;
    isTokenPayment: Attribute.Boolean;
    paymentPurpose: Attribute.Enumeration<
      ['FULL_PAYMENT', 'COD_TOKEN', 'COD_REMAINING']
    >;
    remainingAmount: Attribute.Decimal;
    paidAmount: Attribute.Decimal;
    discountAmount: Attribute.Decimal;
    paymentStatus: Attribute.Enumeration<
      ['PENDING', 'PARTIAL', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']
    >;
    razorpayDetails: Attribute.JSON;
    codPaymentDetails: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentSettingPaymentSetting extends Schema.SingleType {
  collectionName: 'payment_settings';
  info: {
    singularName: 'payment-setting';
    pluralName: 'payment-settings';
    displayName: 'payment-settings';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    codSettings: Attribute.JSON;
    onlineSettings: Attribute.JSON;
    isEnabled: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment-setting.payment-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment-setting.payment-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPickupLocationPickupLocation extends Schema.CollectionType {
  collectionName: 'pickup_locations';
  info: {
    singularName: 'pickup-location';
    pluralName: 'pickup-locations';
    displayName: 'Pickup Location';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    warehouseName: Attribute.String;
    name: Attribute.String;
    address: Attribute.String;
    address_2: Attribute.String;
    city: Attribute.String;
    state: Attribute.String;
    pincode: Attribute.String;
    phone: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pickup-location.pickup-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::pickup-location.pickup-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    hashtag: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media;
    route: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text;
    description: Attribute.Text;
    slug: Attribute.UID<'api::product.product', 'subTitle'>;
    originCountry: Attribute.String;
    material: Attribute.String;
    discountable: Attribute.Boolean;
    variations: Attribute.Component<'variations.options', true>;
    variants: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::product-variant.product-variant'
    >;
    categories: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::category.category'
    >;
    collections: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::collection.collection'
    >;
    groupBy: Attribute.String;
    template: Attribute.String;
    tags: Attribute.Text;
    fit: Attribute.String;
    length: Attribute.String & Attribute.DefaultTo<'0'>;
    sleeveTypes: Attribute.String;
    neckLine: Attribute.String;
    components: Attribute.String;
    numberOfComponents: Attribute.String;
    febric: Attribute.String;
    typeOfWork: Attribute.String;
    care: Attribute.String;
    disclaimer: Attribute.Text;
    shippingDisclaimer: Attribute.Text;
    media: Attribute.Component<'variations.color-images', true>;
    package_weight: Attribute.String & Attribute.DefaultTo<'0'>;
    package_height: Attribute.String & Attribute.DefaultTo<'0'>;
    package_width: Attribute.String & Attribute.DefaultTo<'0'>;
    package_breadth: Attribute.String & Attribute.DefaultTo<'0'>;
    package_length: Attribute.String;
    label: Attribute.Text;
    discountType: Attribute.String;
    discountValue: Attribute.String;
    stag: Attribute.Text;
    expectedDeliveryDays: Attribute.Integer;
    icons: Attribute.Media;
    product_icons: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::product-icon.product-icon'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductIconProductIcon extends Schema.CollectionType {
  collectionName: 'product_icons';
  info: {
    singularName: 'product-icon';
    pluralName: 'product-icons';
    displayName: 'Product Icon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    Icon: Attribute.Media;
    Description: Attribute.Text;
    products: Attribute.Relation<
      'api::product-icon.product-icon',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-icon.product-icon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-icon.product-icon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductVariantProductVariant extends Schema.CollectionType {
  collectionName: 'product_variants';
  info: {
    singularName: 'product-variant';
    pluralName: 'product-variants';
    displayName: 'Product Variant';
    description: '';
  };
  options: {
    draftAndPublish: true;
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
    height: Attribute.BigInteger;
    length: Attribute.BigInteger;
    width: Attribute.BigInteger;
    price: Attribute.Decimal;
    thumbnail: Attribute.Media;
    media: Attribute.Media;
    slug: Attribute.UID<'api::product-variant.product-variant', 'title'>;
    options: Attribute.Component<'variations.voptions', true>;
    product: Attribute.Relation<
      'api::product-variant.product-variant',
      'manyToOne',
      'api::product.product'
    >;
    commitedQuantity: Attribute.BigInteger;
    discountedPrice: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-variant.product-variant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-variant.product-variant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPromocodePromocode extends Schema.CollectionType {
  collectionName: 'promocodes';
  info: {
    singularName: 'promocode';
    pluralName: 'promocodes';
    displayName: 'Promocode';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    startDate: Attribute.DateTime;
    endDate: Attribute.DateTime;
    code: Attribute.String;
    type: Attribute.Enumeration<['flat', 'percentage']>;
    value: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::promocode.promocode',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::promocode.promocode',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShipmentShipment extends Schema.CollectionType {
  collectionName: 'shipments';
  info: {
    singularName: 'shipment';
    pluralName: 'shipments';
    displayName: 'Shipment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    orderId: Attribute.String;
    shipmentId: Attribute.String;
    awbNumber: Attribute.String;
    courierId: Attribute.String;
    courierName: Attribute.String;
    status: Attribute.String;
    additionalInfo: Attribute.String;
    paymentType: Attribute.String;
    label: Attribute.String;
    manifest: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shipment.shipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shipment.shipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubCategorySubCategory extends Schema.CollectionType {
  collectionName: 'sub_categories';
  info: {
    singularName: 'sub-category';
    pluralName: 'sub-categories';
    displayName: 'SubCategory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupercoinSupercoin extends Schema.CollectionType {
  collectionName: 'supercoins';
  info: {
    singularName: 'supercoin';
    pluralName: 'supercoins';
    displayName: 'Supercoin';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    balance: Attribute.BigInteger;
    user: Attribute.Relation<
      'api::supercoin.supercoin',
      'oneToOne',
      'admin::user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supercoin.supercoin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supercoin.supercoin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupercoinTransectionSupercoinTransection
  extends Schema.CollectionType {
  collectionName: 'supercoin_transections';
  info: {
    singularName: 'supercoin-transection';
    pluralName: 'supercoin-transections';
    displayName: 'Supercoin Transection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    amount: Attribute.BigInteger;
    user: Attribute.Relation<
      'api::supercoin-transection.supercoin-transection',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    sortDate: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supercoin-transection.supercoin-transection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supercoin-transection.supercoin-transection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTiketTiket extends Schema.CollectionType {
  collectionName: 'tikets';
  info: {
    singularName: 'tiket';
    pluralName: 'tikets';
    displayName: 'Tiket';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    title: Attribute.String;
    customer: Attribute.Relation<
      'api::tiket.tiket',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    order: Attribute.Relation<
      'api::tiket.tiket',
      'manyToOne',
      'api::order.order'
    >;
    reason: Attribute.Text;
    status: Attribute.String;
    refundableAmount: Attribute.BigInteger;
    type: Attribute.Text;
    ticketId: Attribute.UID & Attribute.CustomField<'plugin::field-uuid.uuid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tiket.tiket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tiket.tiket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTransectionTransection extends Schema.CollectionType {
  collectionName: 'transections';
  info: {
    singularName: 'transection';
    pluralName: 'transections';
    displayName: 'Transection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    gateway: Attribute.JSON;
    type: Attribute.Enumeration<['order', 'coin', 'wallet', 'giftcard']>;
    label: Attribute.String;
    user: Attribute.Relation<
      'api::transection.transection',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    status: Attribute.Enumeration<['paid', 'pending', 'cancelled', 'refunded']>;
    amount: Attribute.Integer & Attribute.DefaultTo<0>;
    orderGroup: Attribute.Relation<
      'api::transection.transection',
      'oneToOne',
      'api::order-group.order-group'
    >;
    giftcard: Attribute.Relation<
      'api::transection.transection',
      'oneToOne',
      'api::giftcard.giftcard'
    >;
    wallet: Attribute.Relation<
      'api::transection.transection',
      'manyToOne',
      'api::wallet.wallet'
    >;
    value: Attribute.Integer & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::transection.transection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::transection.transection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUtmTrackingUtmTracking extends Schema.CollectionType {
  collectionName: 'utm_trackings';
  info: {
    singularName: 'utm-tracking';
    pluralName: 'utm-trackings';
    displayName: 'UTM Tracking';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    utm_source: Attribute.String;
    utm_campaign: Attribute.String;
    utm_medium: Attribute.String;
    campaign_id: Attribute.String;
    adgroup_id: Attribute.String;
    match_type: Attribute.String;
    device: Attribute.String;
    device_model: Attribute.String;
    keyword: Attribute.String;
    timestamp: Attribute.DateTime;
    path: Attribute.String;
    user: Attribute.Relation<
      'api::utm-tracking.utm-tracking',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    order_id: Attribute.String;
    order_amount: Attribute.Decimal;
    user_details: Attribute.JSON;
    checkout_details: Attribute.JSON;
    payment_method: Attribute.String;
    checkout_status: Attribute.Enumeration<
      ['initiated', 'purchased', 'abandoned', 'failed']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::utm-tracking.utm-tracking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::utm-tracking.utm-tracking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWalletWallet extends Schema.CollectionType {
  collectionName: 'wallets';
  info: {
    singularName: 'wallet';
    pluralName: 'wallets';
    displayName: 'Wallet';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    balance: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    user: Attribute.Relation<
      'api::wallet.wallet',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    transections: Attribute.Relation<
      'api::wallet.wallet',
      'oneToMany',
      'api::transection.transection'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wallet.wallet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wallet.wallet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWishlistWishlist extends Schema.CollectionType {
  collectionName: 'wishlists';
  info: {
    singularName: 'wishlist';
    pluralName: 'wishlists';
    displayName: 'Wishlist';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    product: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToOne',
      'api::product.product'
    >;
    variant: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToOne',
      'api::product-variant.product-variant'
    >;
    user: Attribute.Relation<
      'api::wishlist.wishlist',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::address.address': ApiAddressAddress;
      'api::addtional.addtional': ApiAddtionalAddtional;
      'api::banner.banner': ApiBannerBanner;
      'api::cart.cart': ApiCartCart;
      'api::category.category': ApiCategoryCategory;
      'api::collection.collection': ApiCollectionCollection;
      'api::comission.comission': ApiComissionComission;
      'api::conversion.conversion': ApiConversionConversion;
      'api::country.country': ApiCountryCountry;
      'api::coupan.coupan': ApiCoupanCoupan;
      'api::custom.custom': ApiCustomCustom;
      'api::customization.customization': ApiCustomizationCustomization;
      'api::discount-track.discount-track': ApiDiscountTrackDiscountTrack;
      'api::giftcard.giftcard': ApiGiftcardGiftcard;
      'api::giftcard-template.giftcard-template': ApiGiftcardTemplateGiftcardTemplate;
      'api::notification.notification': ApiNotificationNotification;
      'api::order.order': ApiOrderOrder;
      'api::order-group.order-group': ApiOrderGroupOrderGroup;
      'api::order-item.order-item': ApiOrderItemOrderItem;
      'api::payment.payment': ApiPaymentPayment;
      'api::payment-setting.payment-setting': ApiPaymentSettingPaymentSetting;
      'api::pickup-location.pickup-location': ApiPickupLocationPickupLocation;
      'api::post.post': ApiPostPost;
      'api::product.product': ApiProductProduct;
      'api::product-icon.product-icon': ApiProductIconProductIcon;
      'api::product-variant.product-variant': ApiProductVariantProductVariant;
      'api::promocode.promocode': ApiPromocodePromocode;
      'api::shipment.shipment': ApiShipmentShipment;
      'api::sub-category.sub-category': ApiSubCategorySubCategory;
      'api::supercoin.supercoin': ApiSupercoinSupercoin;
      'api::supercoin-transection.supercoin-transection': ApiSupercoinTransectionSupercoinTransection;
      'api::tiket.tiket': ApiTiketTiket;
      'api::transection.transection': ApiTransectionTransection;
      'api::utm-tracking.utm-tracking': ApiUtmTrackingUtmTracking;
      'api::wallet.wallet': ApiWalletWallet;
      'api::wishlist.wishlist': ApiWishlistWishlist;
    }
  }
}
