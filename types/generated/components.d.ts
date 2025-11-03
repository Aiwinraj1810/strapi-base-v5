import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAboutBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about_banners';
  info: {
    displayName: 'About Banner';
    icon: 'grid';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    IsHomePage: Schema.Attribute.Boolean;
    Poster: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.Text;
    VideoUrl: Schema.Attribute.String;
  };
}

export interface BlocksClients extends Struct.ComponentSchema {
  collectionName: 'components_blocks_clients';
  info: {
    displayName: 'Clients';
    icon: 'apps';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', true>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.Text;
  };
}

export interface BlocksContactBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_banners';
  info: {
    displayName: 'Contact Banner';
    icon: 'phone';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Email: Schema.Attribute.Email;
    Media: Schema.Attribute.Component<'elements.image-video-item', false>;
    PhoneNumber: Schema.Attribute.String;
    SubTitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksContactFormBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_form_blocks';
  info: {
    displayName: 'Contact Form Block';
    icon: 'envelop';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_content_blocks';
  info: {
    displayName: 'Content Block';
    icon: 'pencil';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    EnablePadding: Schema.Attribute.Boolean;
  };
}

export interface BlocksDetailsContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_details_contents';
  info: {
    displayName: 'Details Content';
    icon: 'file';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Description: Schema.Attribute.Text;
    Items: Schema.Attribute.Component<'elements.details-content-group', true>;
    Title: Schema.Attribute.Text;
  };
}

export interface BlocksFullWidthImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_full_width_images';
  info: {
    displayName: 'Full Width Image';
    icon: 'landscape';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    VideoURL: Schema.Attribute.String;
  };
}

export interface BlocksFullscreenAnimatedText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_fullscreen_animated_texts';
  info: {
    displayName: 'Fullscreen Animated Text';
    icon: 'play';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Items: Schema.Attribute.Component<
      'elements.fullscreen-animated-text-item',
      true
    >;
  };
}

export interface BlocksFullscreenStikySlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_fullscreen_stiky_sliders';
  info: {
    displayName: 'Fullscreen Sticky Slider';
    icon: 'filter';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Items: Schema.Attribute.Component<
      'elements.image-title-description-item',
      true
    >;
  };
}

export interface BlocksGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'landscape';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Items: Schema.Attribute.Component<'elements.image-video-item', true>;
  };
}

export interface BlocksHorizontalStickyCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_horizontal_sticky_cards';
  info: {
    displayName: 'Horizontal Sticky Cards';
    icon: 'filter';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Items: Schema.Attribute.Component<'elements.sticky-cards-item', true>;
  };
}

export interface BlocksImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_sliders';
  info: {
    displayName: 'Image Slider';
    icon: 'landscape';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Description: Schema.Attribute.Text;
    Items: Schema.Attribute.Component<'elements.image-video-item', true>;
    Title: Schema.Attribute.Text;
  };
}

export interface BlocksImageVideoTextFillOnScroll
  extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_video_text_fill_on_scrolls';
  info: {
    displayName: 'Image-Video-Text Fill On Scroll';
    icon: 'bulletList';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Items: Schema.Attribute.Component<'elements.image-video-item', true>;
  };
}

export interface BlocksQuoteBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_quote_blocks';
  info: {
    displayName: 'Quote Block';
    icon: 'quote';
  };
  attributes: {
    Author: Schema.Attribute.String;
    Common: Schema.Attribute.Component<'global.common', false>;
    Quote: Schema.Attribute.Text;
  };
}

export interface BlocksQuoteWithBackground extends Struct.ComponentSchema {
  collectionName: 'components_blocks_quote_with_backgrounds';
  info: {
    displayName: 'Quote With Background';
    icon: 'quote';
  };
  attributes: {
    Author: Schema.Attribute.String;
    Common: Schema.Attribute.Component<'global.common', false>;
    Poster: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Subtitle: Schema.Attribute.String;
    Text: Schema.Attribute.Text;
    TextColor: Schema.Attribute.Enumeration<['white', 'black', 'orange']>;
    VideoUrl: Schema.Attribute.String;
  };
}

export interface BlocksRelatedInsights extends Struct.ComponentSchema {
  collectionName: 'components_blocks_related_insights';
  info: {
    displayName: 'Related Insights';
    icon: 'bulletList';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    limit: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksSimpleImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_simple_image_galleries';
  info: {
    displayName: 'Simple Image Gallery';
    icon: 'picture';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Slides: Schema.Attribute.Component<'elements.image-video-item', true>;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksStickyCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sticky_cards';
  info: {
    displayName: 'Sticky Cards';
    icon: 'filter';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Description: Schema.Attribute.Text;
    Items: Schema.Attribute.Component<'elements.sticky-cards-item', true>;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksTeamBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_team_blocks';
  info: {
    displayName: 'Team Block';
    icon: 'emotionHappy';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    TeamMemberOne: Schema.Attribute.Component<'elements.team-item', false>;
    TeamMemberThree: Schema.Attribute.Component<'elements.team-item', false>;
    TeamMemberTwo: Schema.Attribute.Component<'elements.team-item', false>;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksTestBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_test_blocks';
  info: {
    displayName: 'TestBlock';
    icon: 'attachment';
  };
  attributes: {
    Title: Schema.Attribute.String;
  };
}

export interface BlocksTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    displayName: 'Testimonials';
    icon: 'discuss';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Items: Schema.Attribute.Component<
      'elements.image-title-description-item',
      true
    >;
    ShowBlockNumber: Schema.Attribute.Boolean;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksTextPlateWithBackground extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_plate_with_backgrounds';
  info: {
    displayName: 'Text Plate With Background';
    icon: 'message';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Items: Schema.Attribute.Component<'elements.details-content-item', true>;
    Position: Schema.Attribute.Enumeration<
      ['TL', 'TC', 'TR', 'CL', 'CC', 'CR', 'BL', 'BC', 'BR']
    >;
  };
}

export interface BlocksThankYou extends Struct.ComponentSchema {
  collectionName: 'components_blocks_thank_yous';
  info: {
    displayName: 'Thank You';
    icon: 'check';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    SubTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksTwoColumnContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_two_column_content_blocks';
  info: {
    description: '';
    displayName: 'Two Column Content Block';
    icon: 'bulletList';
  };
  attributes: {
    ContentLeft: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    ContentRight: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface BlocksVideoPlayer extends Struct.ComponentSchema {
  collectionName: 'components_blocks_video_players';
  info: {
    displayName: 'Video Player';
    icon: 'play';
  };
  attributes: {
    Common: Schema.Attribute.Component<'global.common', false>;
    Poster: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    PreviewVideoUrl: Schema.Attribute.String;
    Title: Schema.Attribute.String;
    VideoUrl: Schema.Attribute.String;
  };
}

export interface ElementsCookiesPolicy extends Struct.ComponentSchema {
  collectionName: 'components_elements_cookies_policies';
  info: {
    displayName: 'Cookies Policy';
    icon: 'cog';
  };
  attributes: {
    SubTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface ElementsDetailsContentGroup extends Struct.ComponentSchema {
  collectionName: 'components_elements_details_content_groups';
  info: {
    displayName: 'Details Content Group';
    icon: 'dashboard';
  };
  attributes: {
    FullWidth: Schema.Attribute.Boolean;
    Items: Schema.Attribute.Component<'elements.details-content-item', true>;
    MobileInline: Schema.Attribute.Boolean;
    Parallax: Schema.Attribute.Boolean;
  };
}

export interface ElementsDetailsContentItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_details_content_items';
  info: {
    displayName: 'Details Content Item';
    icon: 'bulletList';
  };
  attributes: {
    CustomWidthPercentage: Schema.Attribute.Integer;
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
    VideoUrl: Schema.Attribute.String;
  };
}

export interface ElementsFullscreenAnimatedTextItem
  extends Struct.ComponentSchema {
  collectionName: 'components_elements_fullscreen_animated_text_items';
  info: {
    displayName: 'Fullscreen Animated Text Item';
    icon: 'bulletList';
  };
  attributes: {
    Poster: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Subtitle: Schema.Attribute.String;
    Text: Schema.Attribute.Text;
    VideoUrl: Schema.Attribute.String;
  };
}

export interface ElementsImageTitleDescriptionItem
  extends Struct.ComponentSchema {
  collectionName: 'components_elements_image_title_description_items';
  info: {
    displayName: 'Image Title Description Item';
    icon: 'bulletList';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.Text;
  };
}

export interface ElementsImageVideoItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_image_video_items';
  info: {
    displayName: 'Image-Video Item';
    icon: 'bulletList';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    VideoUrl: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    Title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['internal', 'external']>;
    url: Schema.Attribute.String;
  };
}

export interface ElementsStickyCardsItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_sticky_cards_items';
  info: {
    displayName: 'Sticky Cards Item';
    icon: 'bulletList';
  };
  attributes: {
    Color: Schema.Attribute.Enumeration<
      ['RoseGold', 'Blue', 'DarkBlue', 'Orange']
    > &
      Schema.Attribute.DefaultTo<'RoseGold'>;
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Text: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface ElementsTeamItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_team_items';
  info: {
    displayName: 'Team Item';
    icon: 'user';
  };
  attributes: {
    CalendarCode: Schema.Attribute.Text;
    Designation: Schema.Attribute.String;
    Email: Schema.Attribute.Email;
    Name: Schema.Attribute.String;
    PhoneNumber: Schema.Attribute.String;
    Profile: Schema.Attribute.Media<'images'>;
  };
}

export interface FooterLinksGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_links_groups';
  info: {
    displayName: 'Links group';
    icon: 'bulletList';
  };
  attributes: {
    HiddenOnMobile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    Items: Schema.Attribute.Component<'elements.link', true>;
    link: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface FooterSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    displayName: 'Social Links';
    icon: 'twitter';
  };
  attributes: {
    social_icon: Schema.Attribute.Media<'images'>;
    social_link: Schema.Attribute.String;
  };
}

export interface GlobalCommon extends Struct.ComponentSchema {
  collectionName: 'components_global_commons';
  info: {
    displayName: 'Common';
    icon: 'bulletList';
  };
  attributes: {
    BlockID: Schema.Attribute.String;
    HideBlock: Schema.Attribute.Boolean;
  };
}

export interface GlobalConfig extends Struct.ComponentSchema {
  collectionName: 'components_global_configs';
  info: {
    displayName: 'Config';
    icon: 'lock';
  };
  attributes: {
    ConfigKey: Schema.Attribute.String;
    ConfigValue: Schema.Attribute.Text;
  };
}

export interface GlobalFormAfterSubmission extends Struct.ComponentSchema {
  collectionName: 'components_global_form_after_submissions';
  info: {
    displayName: 'Form After Submission';
    icon: 'link';
  };
  attributes: {
    Link: Schema.Attribute.String;
    Message: Schema.Attribute.Text;
    Type: Schema.Attribute.Enumeration<['message', 'link']>;
  };
}

export interface GlobalFormEmailTemplates extends Struct.ComponentSchema {
  collectionName: 'components_global_form_email_templates';
  info: {
    displayName: 'Form Email Templates';
    icon: 'envelop';
  };
  attributes: {
    EmailSubject: Schema.Attribute.String;
    Enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    RecipientEmail: Schema.Attribute.String;
    SenderEmail: Schema.Attribute.String;
  };
}

export interface GlobalFormFields extends Struct.ComponentSchema {
  collectionName: 'components_global_form_fields';
  info: {
    description: '';
    displayName: 'Form Fields';
    icon: 'bulletList';
  };
  attributes: {
    Label: Schema.Attribute.String;
    Mandatory: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Placeholder: Schema.Attribute.String;
    SelectOptions: Schema.Attribute.Component<
      'global.form-select-options',
      true
    >;
    SubmissionKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    Type: Schema.Attribute.Enumeration<
      [
        'text',
        'number',
        'email',
        'textarea',
        'select',
        'upload',
        'checkbox',
        'radio',
        'hidden',
        'phone',
        'country',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
    Validations: Schema.Attribute.Component<'global.form-validations', false>;
  };
}

export interface GlobalFormSelectOptions extends Struct.ComponentSchema {
  collectionName: 'components_global_form_select_options';
  info: {
    displayName: 'Form Select Options';
    icon: 'bulletList';
  };
  attributes: {
    Label: Schema.Attribute.String & Schema.Attribute.Required;
    SendToEmail: Schema.Attribute.String;
    Value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalFormSubmissions extends Struct.ComponentSchema {
  collectionName: 'components_global_form_submissions';
  info: {
    description: '';
    displayName: 'Form Submissions';
    icon: 'information';
  };
  attributes: {
    Label: Schema.Attribute.String;
    SubmissionKey: Schema.Attribute.String;
    Type: Schema.Attribute.String;
    Value: Schema.Attribute.String;
  };
}

export interface GlobalFormValidations extends Struct.ComponentSchema {
  collectionName: 'components_global_form_validations';
  info: {
    displayName: 'Form Validations';
    icon: 'cursor';
  };
  attributes: {
    ErrorMessage: Schema.Attribute.String;
    MaxFiles: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
  };
}

export interface GlobalSeo extends Struct.ComponentSchema {
  collectionName: 'components_global_seos';
  info: {
    description: '';
    displayName: 'SEO';
    icon: 'dashboard';
  };
  attributes: {
    MetaDescription: Schema.Attribute.Text;
    MetaImage: Schema.Attribute.Media<'images'>;
    MetaRobots: Schema.Attribute.String;
    MetaTitle: Schema.Attribute.String;
    StructuredData: Schema.Attribute.JSON;
  };
}

export interface HomeHomePageConfig extends Struct.ComponentSchema {
  collectionName: 'components_home_home_page_configs';
  info: {
    displayName: 'Home Page Config';
    icon: 'apps';
  };
  attributes: {
    AboutBannerSubtitle: Schema.Attribute.Text;
    AboutBannerTitle: Schema.Attribute.Text;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about-banner': BlocksAboutBanner;
      'blocks.clients': BlocksClients;
      'blocks.contact-banner': BlocksContactBanner;
      'blocks.contact-form-block': BlocksContactFormBlock;
      'blocks.content-block': BlocksContentBlock;
      'blocks.details-content': BlocksDetailsContent;
      'blocks.full-width-image': BlocksFullWidthImage;
      'blocks.fullscreen-animated-text': BlocksFullscreenAnimatedText;
      'blocks.fullscreen-stiky-slider': BlocksFullscreenStikySlider;
      'blocks.gallery': BlocksGallery;
      'blocks.horizontal-sticky-cards': BlocksHorizontalStickyCards;
      'blocks.image-slider': BlocksImageSlider;
      'blocks.image-video-text-fill-on-scroll': BlocksImageVideoTextFillOnScroll;
      'blocks.quote-block': BlocksQuoteBlock;
      'blocks.quote-with-background': BlocksQuoteWithBackground;
      'blocks.related-insights': BlocksRelatedInsights;
      'blocks.simple-image-gallery': BlocksSimpleImageGallery;
      'blocks.sticky-cards': BlocksStickyCards;
      'blocks.team-block': BlocksTeamBlock;
      'blocks.test-block': BlocksTestBlock;
      'blocks.testimonials': BlocksTestimonials;
      'blocks.text-plate-with-background': BlocksTextPlateWithBackground;
      'blocks.thank-you': BlocksThankYou;
      'blocks.two-column-content-block': BlocksTwoColumnContentBlock;
      'blocks.video-player': BlocksVideoPlayer;
      'elements.cookies-policy': ElementsCookiesPolicy;
      'elements.details-content-group': ElementsDetailsContentGroup;
      'elements.details-content-item': ElementsDetailsContentItem;
      'elements.fullscreen-animated-text-item': ElementsFullscreenAnimatedTextItem;
      'elements.image-title-description-item': ElementsImageTitleDescriptionItem;
      'elements.image-video-item': ElementsImageVideoItem;
      'elements.link': ElementsLink;
      'elements.sticky-cards-item': ElementsStickyCardsItem;
      'elements.team-item': ElementsTeamItem;
      'footer.links-group': FooterLinksGroup;
      'footer.social-links': FooterSocialLinks;
      'global.common': GlobalCommon;
      'global.config': GlobalConfig;
      'global.form-after-submission': GlobalFormAfterSubmission;
      'global.form-email-templates': GlobalFormEmailTemplates;
      'global.form-fields': GlobalFormFields;
      'global.form-select-options': GlobalFormSelectOptions;
      'global.form-submissions': GlobalFormSubmissions;
      'global.form-validations': GlobalFormValidations;
      'global.seo': GlobalSeo;
      'home.home-page-config': HomeHomePageConfig;
    }
  }
}
