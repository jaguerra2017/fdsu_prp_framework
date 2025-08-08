### Porpuse
This document provide existing code examples oriented on how UI components and css should be implemented in terms of structure

### Main Component
- Use this existing code to understand how we build pages with multiple components, either custom or existing in our UI library `$CODEBASE_PATH/site/client/js/itm_report.js`
- This is how main page view needs to be built most of the time, use this file as reference `$CODEBASE_PATH/site/views/itmReport/index.php`
- Review and understand this file for state management (store) `$CODEBASE_PATH/site/client/js/store/itm_report.js`

### Custom components
- This is a good example of custom component that use UI library components inside, make sure to check `$CODEBASE_PATH/site/client/js/components/itm_report/itm_upsert_modal.vue`
- Use `$CODEBASE_PATH/site/client/js/components/itm_report/itm_credits_modal.js` as reference since it's a modal opened from side bar too, "🚨 **CRITICAL:** Review all component imports and file references before implementation"

### Styles
- **IMPORTANT** By reviewing `$CODEBASE_PATH/site/client/css/pages/_itm_report.scss` please notice that most of styles are already inside each UI component, so most of the time just few custom styles are required