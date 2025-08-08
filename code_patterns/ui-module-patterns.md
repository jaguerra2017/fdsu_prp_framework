# UI Module Development Patterns, Rules & Principles (PRP)

## Purpose
This document provides existing code examples oriented on how UI components and CSS should be implemented in terms of structure.

## AI Agent Guidelines
**Act as a Senior Frontend Developer** specializing in JavaScript and Vue 2 framework. When implementing new modules:
- Apply best practices for Vue 2 component architecture
- Follow established JavaScript patterns and conventions
- Prioritize code maintainability and performance
- Use modern ES6+ features appropriately for the Vue 2 ecosystem
- Implement responsive design principles
- Focus on accessibility and user experience

**Important:** This codebase uses Vue 2, not Vue 3. Follow Vue 2 patterns for:
- Component definition syntax
- Lifecycle hooks
- Event handling
- Reactivity system
- Composition patterns

### Reference Files for Learning

#### Main Component Structure
- **Reference:** `codebase/site/client/js/itm_report.js`
- **Purpose:** Use this existing code to understand how we build pages with multiple components, either custom or existing in our UI library. This demonstrates the main entry point pattern with Vue instance setup, store integration, and component imports.

#### Main Page View Structure
- **Reference:** `codebase/codebase/site/views/itmReport/index.php`
- **Purpose:** This is how main page view needs to be built most of the time. Shows proper PHP asset registration, parameter passing, and app container setup.

#### State Management (Store)
- **Reference:** `codebase/site/client/js/store/itm_report.js`
- **Purpose:** Review and understand this file for comprehensive state management patterns including CRUD operations, modal management, form validation, and API integration.

#### Custom Component Example
- **Reference:** `codebase/codebase/site/client/js/components/itm_report/itm_upsert_modal.vue`
- **Purpose:** This is a good example of custom component that uses UI library components inside. Demonstrates modal structure, form integration, and component composition.

#### Minimal Custom Styles
- **Reference:** `codebase/codebase/site/client/css/pages/_itm_report.scss`
- **Purpose:** **IMPORTANT** - By reviewing this file, notice that most styles are already inside each UI component, so most of the time just few custom styles are required. This demonstrates the minimal override approach.

## Table of Contents
1. [File Structure & Organization](#file-structure--organization)
2. [Entry Point Patterns](#entry-point-patterns)
3. [Store Management](#store-management)
4. [Component Architecture](#component-architecture)
5. [Layout & Navigation](#layout--navigation)
6. [Table Components](#table-components)
7. [Modal & Dialog Management](#modal--dialog-management)
8. [CSS & Styling Guidelines](#css--styling-guidelines)
9. [PHP Integration](#php-integration)
10. [Generic Components](#generic-components)
11. [Best Practices](#best-practices)

---

## File Structure & Organization

### Standard Module Structure
```
codebase/site/
├── client/
│   ├── js/
│   │   ├── {module_name}.js                    # Main entry point
│   │   ├── store/{module_name}.js              # Vuex store
│   │   └── components/{module_name}/           # Module components
│   │       ├── {module_name}_header.js         # Page header
│   │       ├── {module_name}_table.js          # Main table
│   │       ├── {module_name}_upsert_modal.vue  # Create/Edit modal
│   │       ├── {module_name}_utils.js          # Utility functions
│   │       └── components/                     # Sub-components
│   │           ├── {sub_component}.vue
│   │           └── {sub_component}_modal.vue
│   └── css/
│       └── pages/_{module_name}.scss           # Module-specific styles
└── views/{moduleName}/
    └── index.php                               # PHP view entry point
```

**Example:** ITM Report module structure
- `codebase/site/client/js/itm_report.js`
- `codebase/site/client/js/store/itm_report.js`
- `codebase/codebase/site/client/js/components/itm_report/itm_report_header.js`
- `codebase/codebase/site/client/js/components/itm_report/itm_table.js`
- `codebase/codebase/site/client/js/components/itm_report/itm_upsert_modal.vue`

---

## Entry Point Patterns

### Main Module File (`{module_name}.js`)

**Reference Implementation:** `codebase/site/client/js/itm_report.js`

**Key Structure Elements:**
- Vue instance with store integration
- UI-Vue component imports (FdAlertBar, FdButton, etc.)
- LayoutDefault as base layout
- Module-specific components (header, table, modals)
- Confirm dialog service integration
- Store actions mapping (initModule pattern)
- App mounting to specific DOM element

**Critical Patterns:**
1. Always use `LayoutDefault` component
2. Import UI-Vue components consistently
3. Use confirm dialog service for destructive actions
4. Mount to specific app ID: `#{module_name}_app`
5. Initialize module on mounted lifecycle

---

## Store Management

### Store Structure (`store/{module_name}.js`)

**Reference Implementation:** `codebase/site/client/js/store/itm_report.js`

**Key Architecture Elements:**
- Vuex store with namespaced modules
- Standard state management for tables (columns, items, pagination, filters)
- Form validation using FormCreator pattern
- Modal and slideout integration from UI-Vue
- Network request handling with proper error management
- Factory functions for clean state initialization

**Core State Categories:**
1. **Table State** - columns, items, pagination, sorting, filters
2. **Form State** - FormCreator instances with validation
3. **UI State** - loading, initialization, responsive helpers
4. **Modal State** - integrated with UI-Vue modal system
5. **Permission State** - user permissions and access control

**Standard Actions Pattern:**
- `getListConfig()` - Fetch table configuration and permissions
- `getListItems()` - Fetch paginated data with filters/search
- `initModule()` - Initialize complete module state
- `openUpsertModal()` / `closeUpsertModal()` - Modal management
- CRUD operations with proper error handling

**Critical Store Rules:**
1. Always include `modalStore` and `slideoutStore` modules
2. Use `REQUEST_TIMEOUT` constant (25000ms)
3. Use factory functions for clean state initialization
4. Include responsive getters for UI breakpoints
5. Use `FormCreator` for form validation
6. Implement proper error handling with `handleNetworkError`
7. Follow standard CRUD actions pattern

---

## Component Architecture

### Page Header Component (`{module_name}_header.js`)

**Reference Implementation:** `codebase/codebase/site/client/js/components/itm_report/itm_report_header.js`

**Key Structure Elements:**
- FdPageHeader component usage with slot structure
- Permission-based button display logic
- Responsive design with breakpoint management
- Debounced resize handling for performance
- Store integration for actions and state

**Critical Patterns:**
1. Use `FdPageHeader` with proper slot structure (main, actions-right)
2. Implement permission checks for action buttons
3. Include responsive breakpoint tracking
4. Use debounced resize handlers
5. Proper lifecycle management (created, mounted, beforeDestroy)

### Table Component (`{module_name}_table.js`)

**Reference Implementation:** `codebase/codebase/site/client/js/components/itm_report/itm_table.js`

**Key Structure Elements:**
- FdTable component with comprehensive configuration
- Action management system (single row actions)
- Filter, search, and pagination integration
- Permission-based action display
- Confirm dialog integration for destructive actions
- Store integration for all table operations

**Critical FdTable Props:**
- `allow-mobile-view`, `allow-pagination`, `fit-to-container`
- Column management (`columns`, `column-options`, `columns-selected`)
- Data binding (`items`, `filters`, `filter-values`, `search-value`)
- Event handling (filters, search, pagination, sorting)
- Empty state configuration

**Action System:**
- Single row actions with permission checks
- Context-based action display logic
- Integrated confirm dialogs in the destructive actions callbacks for safety
- Icon usage from UI-Vue library

---

## Layout & Navigation

### Layout Rules:
1. **Always use `LayoutDefault`** component as the base layout
2. **Page Header** must be included with proper title and actions
3. **Sidebar navigation** should take full available height when present
4. **Use `FdGrid`** for layout management and responsive design

### ⚠️ CRITICAL Layout Requirements:
5. **No Full Page Scroll** - Avoid `body` or `html` scrolling, use container-specific scroll
6. **Minimum Height** - Main page container: `min-height: 600px`
7. **Viewport Usage** - Content areas: `height: calc(100vh - 80px)` (adjust for header)
8. **Internal Scrolling** - Tables and content use `overflow-y: auto` within containers

### Sidebar Styling:
**Reference Implementation:** `codebase/codebase/site/client/css/pages/_itm_report.scss` (lines 15-25)
- Full height sidebar patterns
- Overflow handling for long content
- Menu integration within sidebar

### Grid Usage Examples:
**Study Implementation:** Look for FdGrid usage patterns in:
- `codebase/codebase/site/client/js/components/itm_report/itm_upsert_modal.vue` (lines 87-189)
- `codebase/codebase/site/client/js/components/itm_report/components/itm_new_address_modal.vue` (grid layout examples)

### Sidebar Navigation Patterns:

**Reference Implementation:** `codebase/codebase/site/client/js/components/itm_notification_setting/itm_notification_setting_section_menu.vue`

#### Sidebar Structure Pattern:
- **Menu Items Definition:** (lines 14-61) - `sectionMenuItems()` computed property
- **Filtered Items:** (lines 62-64) - `filteredSectionMenuItems()` for hide/show logic
- **Item Selection:** (lines 87-97) - `handleItemSelect()` method with URL hash support
- **Hash Navigation:** (lines 70-72, 83-86) - URL-based navigation with `hashchange` listener
- **Event Cleanup:** (lines 76-77) - Remove event listeners in `beforeDestroy`

#### Sidebar Props Structure (Use Props, NOT Slots):
**Reference Structure:** `codebase/site/client/js/components/itm_notification_setting/itm_notification_setting_section_menu.vue` (lines 14-61)
- Study the `sectionMenuItems()` computed property for correct menu item structure
- Key properties: `id`, `title`, `icon`, `selected`, `disabled`, `hide`, `testId`
- Use this structure for all sidebar navigation components

#### Responsive Sidebar Requirements:
- **Collapsed State:** Implement `collapsed` prop for small screens
- **Breakpoint Logic:** Handle responsive behavior in component or store
- **Height Management:** Sidebar takes full available height (`height: 100%`)
- **Event Handling:** Use proper callback functions like `@item-select`, NOT slots
- **State Management:** Store sidebar state in Vuex for global access

### Tabs Navigation Patterns:

#### FdTabsLine Component Pattern:
**Reference Implementation:** `codebase/packages/ui-vue/src/components/tabs-line/tabs-line.vue`
- **Options Array:** (lines 14-17) - `options` prop for tab definitions
- **Active Tab Control:** (lines 18-21) - `activeTab` prop for controlling selection
- **Change Event:** (lines 113-123) - `@change-tab` emission pattern
- **Responsive Navigation:** (lines 161-195) - Overflow handling with scroll/menu options
- **Navigation Menu:** (lines 22-25, 166-177) - `isNavigationMenu` prop for dropdown behavior

#### FdTabsButtons Component Pattern:
**Reference Implementation:** `codebase/packages/ui-vue/src/components/tabs-buttons/tabs-buttons.vue`
- **Options Array:** (lines 17-20) - `options` prop for tab definitions
- **Size Variants:** (lines 25-31) - `size` prop with small/medium options
- **Counter Support:** (lines 89-91, 137-142) - Tab counters with `hasCounter()` check
- **Responsive Scrolling:** (lines 92-106, 146-164) - Horizontal scroll for overflow

#### Tabs Options Structure:
**Reference Structure:** `codebase/packages/ui-vue/src/components/tabs-line/tabs-line.vue` (lines 61-67)
- Study the `menuOptions()` computed property for correct tab option structure
- Key properties: `id`, `label`, `icon`, `disabled`, `testId`
- **FdTabsButtons specific:** `counter` (lines 89-91, 137-142)
- **FdTabsLine specific:** `counterAccent`, `statusDot`, `statusDotAccent`, `actions`
- Use this structure for both FdTabsLine and FdTabsButtons components

#### Conditional Tabs with v-if Logic:
- **Dynamic Tabs:** Use `v-if` on tab components to conditionally show/hide
- **Permission-Based:** Filter tabs array based on user permissions in computed properties
- **Feature Flags:** Show/hide tabs based on feature availability from store
- **Responsive Tabs:** Switch between FdTabsLine and FdTabsButtons based on screen size

---

## Table Components

### Table Configuration Rules:
1. **Always use `FdTable`** from UI-Vue
2. **Include standard props:**
   - `allow-mobile-view`
   - `allow-pagination`
   - `fit-to-container`
   - `hide-save-filters` (for simple tables)
3. **Height Management:**
   - Use `height="calc(100vh - {page header height in px, normally 80px})"` for tables to avoid page scroll
   - Tables handle internal scrolling automatically
   - Ensure minimum container height of 600px

### Action Management:

#### Multiple Actions Pattern (Actions Prop)
**Reference Implementation:** `codebase/site/client/js/components/itm_notification_setting/components/itm_reference_documentation.vue`
- **Actions Definition:** (lines 44-64) - getMultipleActions() method pattern
- **Table Integration:** (line 138) - `v-bind:actions="actions"` prop usage
- **Use When:** All actions are uniform buttons that can be handled in a single action menu

#### Header Component Pattern (Template Slot)
**Reference Implementation:** `codebase/site/client/js/components/itm_report/components/systems_table.js`
- **Header Slot:** (lines 23-34) - `v-slot:header-components` template usage
- **Use When:** Mixed component types (buttons + dropdowns) or complex header layouts needed

#### Single Row Actions Pattern
**Reference Implementation:**
- **Single Actions:** `codebase/site/client/js/components/itm_report/itm_table.js` (lines 53-77)
- **System Actions:** `codebase/site/client/js/components/itm_report/components/systems_table.js` (lines 50-71)
- Study action definition patterns, permission checks, and icon usage

#### Bulk Actions Pattern
**Reference Implementation:** `codebase/site/client/js/components/itm_notification_setting/components/itm_reference_documentation.vue`
- **Selection Management:** (lines 16, 136, 42) - selectedElements state and setSelectedElements mutation
- **Bulk Action Disabled State:** (line 50) - `disabled: () => !this.selectedElements.length`
- **Confirmation Dialog:** (lines 100-110) - Bulk delete with confirmation

#### Action Pattern Selection Rules:

**Use Actions Prop Pattern When:**
1. **All actions are uniform components** (all buttons)
2. **Actions can be handled in a single action menu**
3. **Standard bulk operations** (select multiple + action buttons)
4. **Simple action combinations** (create + bulk delete)

**Use Header Component Slot Pattern When:**
1. **Mixed component types** (buttons + dropdowns + action menus)
2. **Different UI components** (button + select dropdown + custom controls)
3. **Complex header layouts** (multiple sections, custom styling)
4. **Single simple action** (just one "Add" button)

**Use Context Actions Pattern For:**
- **Single row operations** (edit, delete, view)
- **Row-specific actions** that depend on row data

**Always Include Selection Management For:**
- **Bulk actions** - implement selectedElements state and mutations

#### Examples of Component Types:

**Uniform Components (Use Actions Prop):**
- All buttons: [Add Button] [Delete Selected Button] [Export Button]
- All menu items in a single dropdown action menu

**Mixed Components (Use Header Slot):**
- Button + Dropdown: [Add Button] + [Status Filter Dropdown]
- Button + Action Menu: [Add Button] + [More Actions ▼ Menu]
- Multiple UI elements: [Add Button] + [Search Input] + [Filter Dropdown]

### Column Configuration:
**Reference Implementation:**
- **Main Table:** `codebase/site/client/js/components/itm_report/itm_table.js` (not explicit columns, uses server config)
- **Systems Table:** `codebase/site/client/js/components/itm_report/components/systems_table.js` (lines 76-165)
- Study column definitions, cell renderers, and action column patterns

---

## File Management Patterns

### File Upload Modal Pattern
**Reference Implementation:** `codebase/site/client/js/components/itm_notification_setting/components/itm_add_reference_documentation.vue`

#### Key Structure Elements:
- **FdFileUploader Component:** (lines 263-298) - Different configurations for document vs image
- **File Type Selection:** (lines 232-244) - Radio button pattern for file types
- **File Display:** (lines 300-321) - FdDataItem for uploaded file preview
- **File Management:** (lines 83-143) - Add, remove, and clean attachment methods

#### File Upload Configuration Patterns:
**Study These Implementations:**
- **Document Upload:** (lines 267-272) - PDF, DOC, PPT file types, 10MB limit
- **Image Upload:** (lines 285-290) - JPEG, GIF, PNG types, 10MB limit
- **URL Input:** (lines 249-261) - Alternative to file upload
- **File Validation:** (lines 101-123) - Success/error handling patterns

#### File Management Methods:
- **addAttachment()** - Add file to form attachments array
- **cleanAttachments()** - Mark files as deleted
- **onSuccess()** - Handle successful upload response
- **onError()** - Handle upload failures
- **removeTempFiles()** - Clean up temporary upload files

#### Form Integration with Files:
**Study Pattern:** `codebase/site/client/js/components/itm_notification_setting/components/itm_add_reference_documentation.vue`
- **Form Fields:** (lines 49-63) - File computation from form attachments array
- **File State Management:** (lines 75-79) - onChangeValue pattern for form updates
- **Type Changes:** (lines 94-100) - Clean attachments when changing file types

#### File Attachment Management:
- **Attachment Array Pattern** - Store files in form.attachments array
- **Soft Delete Pattern** - Mark files as `is_deleted: true` instead of removal
- **File Metadata** - Store original names, sizes, and file types
- **File References** - Handle both temporary uploads and saved file references

#### Critical File Management Rules:
1. **Use FdFileUploader** - Always use UI-Vue file uploader component
2. **File Type Validation** - Configure acceptedFiles property appropriately
3. **Size Limits** - Set maxFilesize (usually 10MB for documents)
4. **Error Handling** - Implement proper success/error callbacks
5. **File Preview** - Use FdDataItem for uploaded file display
6. **Cleanup** - Always clean up temporary files on error
7. **Form Integration** - Store files in attachments array within form data
8. **Soft Delete** - Mark files as deleted rather than removing from array

---

## Modal & Dialog Management

### Modal Component Structure (`{module_name}_upsert_modal.vue`)

**Reference Implementation:** `codebase/site/client/js/components/itm_report/itm_upsert_modal.vue`

**Key Structure Elements:**
- FdModal with target selector pattern
- FdPanel with header customization slots
- FdFooterActions for consistent button placement
- Badge status display integration
- Multi-step modal support with tab navigation
- Form integration with validation states

**Critical Modal Patterns:**
1. **Target Selector** - Use `js-{module-name}-modal` wrapper class
2. **Modal Sizes** - `small`, `medium`, `large`, `extra-large` options
3. **Header Components** - Badge display and close button in extra-header-component slot
4. **Footer Actions** - Consistent Cancel/Save button placement
5. **State Management** - Integration with store for form data and modal state

**Advanced Features:**
- Multi-step modal navigation (see ITM example with tabs)
- Form validation integration with save state
- Badge status display with accent mapping
- Responsive modal sizing via container classes

---

## CSS & Styling Guidelines

### Page-Specific Styles (`pages/_{module_name}.scss`)

**Reference Implementation:** `codebase/site/client/css/pages/_itm_report.scss`

**Study These Patterns:**
- **Layout Structure** (lines 1-14): Page container and layout setup with proper height management
- **No Page Scroll Implementation**: Notice absence of `body` or `html` scroll styles
- **Container Heights**: Usage of `calc(100vh - 80px)` patterns for content areas
- **Header Customizations** (lines 49-55): White text/icon filters for buttons
- **Modal Sizing** (lines 18-48): Container-based width control patterns
- **Responsive Design**: Minimal responsive adjustments
- **CSS Custom Properties**: Usage of `var(--size-*)` and other design tokens

### CSS Rules:
1. **Minimal Custom Styles Required** - Most styling is handled by UI-Vue components
2. **Use CSS Custom Properties** from UI-CSS system (e.g., `var(--size-6)`, `var(--color-primary)`)
3. **Override Only When Necessary** - Prefer component props and variants over custom CSS
4. **White text/icons** for text variant buttons in headers (see filter examples)
5. **Modal width** controlled via container-specific classes
6. **Responsive design** using established breakpoints

### ⚠️ CRITICAL Layout Rules:
7. **Avoid Full Page Scroll** - Main content areas should use internal scrolling containers
8. **Minimum Page Height** - Main page container must have `min-height: 600px`
9. **Viewport Height Management** - Use `calc(100vh - header_height)` for main content areas
10. **Container Scrolling** - Individual components (tables, modals) handle their own scrolling

### Key Learning Reference:
**Study:** `codebase/site/client/css/pages/_itm_report.scss` - Notice how minimal the custom styles are. Most functionality comes from UI components themselves.

**Philosophy:** The UI library components handle 95% of styling needs. Custom CSS should only address:
- Module-specific layout adjustments
- Color filters for header buttons
- Modal container widths
- Minor spacing overrides

---

## PHP Integration

### View File (`views/{moduleName}/index.php`)

**Reference Implementation:** `codebase/site/views/itmReport/index.php`

**Key Structure Elements:**
- Page title setup with Yii translation
- Asset registration using AssetsMap pattern
- External API registration (Google Maps when needed)
- Module parameter passing to JavaScript
- App container with proper ID and class structure

**Critical PHP Patterns:**
1. **AssetsMap Usage** - Use `$assetsMap->get()` for all asset paths
2. **Script Registration** - JS files at `POS_END`, CSS flexible
3. **Parameter Passing** - Via `window.{moduleName}Params` object
4. **Script Position** - Module params in `POS_HEAD`, others at `POS_END`
5. **Container Setup** - Specific ID for Vue mounting, descriptive class

**Asset Registration Order:**
1. External scripts (Google Maps, etc.)
2. Vendor scripts (`vendors.js`)
3. Module scripts (`{module_name}.js`)
4. CSS files (`{module_name}.css`)
5. Module parameters (as inline script)

---

## Generic Components

### Reusable Components Identified:

#### 1. **Address Input Component**
- **Location:** `components/itm_report/itm_new_address_modal.vue`
- **Reusability:** Google address autocomplete with validation
- **Generic Path:** `components/common/address_input.vue`

#### 2. **Status Update Component**
- **Location:** `components/itm_report/components/itm_update_status_step_modal.vue`
- **Reusability:** Status change with comments and attachments
- **Generic Path:** `components/common/status_update_modal.vue`

#### 3. **Attachment Management**
- **Location:** File uploader patterns in ITM modals
- **Reusability:** File upload with preview and validation
- **Generic Path:** `components/common/attachment_manager.vue`

#### 4. **Notification Settings**
- **Location:** `components/itm_notification_setting/`
- **Reusability:** Email/SMS notification configuration
- **Generic Path:** `components/common/notification_settings.vue`

#### 5. **Comments History**
- **Location:** Comments display in ITM modals
- **Reusability:** Timeline-style comment display
- **Generic Path:** `components/common/comments_history.vue`

#### 6. **File Upload Manager**
- **Location:** `components/itm_notification_setting/components/itm_add_reference_documentation.vue`
- **Reusability:** File upload with type selection, validation, and preview
- **Generic Path:** `components/common/file_upload_manager.vue`

#### 7. **Table with Actions**
- **Location:** `components/itm_notification_setting/components/itm_reference_documentation.vue`
- **Reusability:** Table with bulk actions, single actions, and selection management
- **Generic Path:** `components/common/action_table.vue`

#### 8. **Sidebar Navigation**
- **Location:** `components/itm_notification_setting/itm_notification_setting_section_menu.vue`
- **Reusability:** Responsive sidebar menu with hash navigation and conditional items
- **Generic Path:** `components/common/sidebar_navigation.vue`

#### 9. **Tabs Navigation**
- **Location:** `codebase/packages/ui-vue/src/components/tabs-line/tabs-line.vue`, `tabs-buttons/tabs-buttons.vue`
- **Reusability:** Responsive tabs with overflow handling and conditional display
- **Generic Path:** `components/common/tabs_navigation.vue`

### Generic Component Structure:
**Reference Implementation:** `codebase/site/client/js/components/itm_report/components/itm_new_address_modal.vue`
- Study component prop definitions (lines 8-31)
- Event emission patterns (lines 15, 37-51)
- Template structure with UI-Vue component composition
- Script organization and method patterns

---

## Best Practices

### Icon Usage:
**Reference Implementation:** Study icon usage patterns in:
- `codebase/site/client/js/components/itm_report/itm_table.js` (lines 55-67)
- `codebase/site/client/js/components/itm_report/itm_report_header.js` (lines 26-31)
- `codebase/packages/ui-vue/src/components/index.js` - Check available icons in UI-Vue library

**Common Icons:** plus, pen-to-square, eye, trash-can, xmark, check, arrow-left, arrow-right, search, filter
**Fallback:** Use 'plus' if specific icon not available

### Form Validation:
**Reference Implementation:** Study FormCreator patterns in:
- `site/client/js/store/itm_report.js` (lines 42-157): Complex form with validation rules
- `site/client/js/store/itm_report.js` (lines 214-250): Address form validation
- Look for FormCreator usage, validation rules, and autoValidation patterns

### Error Handling:
**Reference Implementation:** Study error handling patterns in:
- `site/client/js/store/itm_report.js` (lines 512-516): Network error handling
- `site/client/js/store/itm_report.js` (lines 580-583): Error catching and notification
- `site/client/js/store/itm_report.js` (lines 759-764): Form validation error alerts
- Look for handleNetworkError usage, FdNotification patterns, and try/catch structures

### Responsive Design:
**Reference Implementation:** Study responsive patterns in:
- `codebase/site/client/js/components/itm_report/itm_report_header.js` (lines 37-63): Breakpoint usage
- `site/client/js/store/itm_report.js` (lines 307-318): Responsive getters
- Look for breakpoints import, containerWidth usage, and responsive computed properties

### Performance Optimization:
**Reference Implementation:** Study performance patterns in:
- `codebase/site/client/js/components/itm_report/itm_report_header.js` (lines 51-56): Debounced resize handling
- Look for debounce import, event listener management, and cleanup in beforeDestroy

### Testing & Accessibility:

#### Test ID Requirements (MANDATORY):
**All interactive components MUST have test-id or data-test-id attributes based on the prop name**

**Reference Implementation:** Study existing test-id patterns in:
- `codebase/site/client/js/components/itm_notification_setting/itm_notification_setting_section_menu.vue` (lines 23, 32, 41, 49, 58)
- `codebase/packages/ui-vue/src/components/tabs-line/tabs-line.vue` (line 153) - `v-bind:test-id="option.testId"`
- Look for `testId` prop usage in menu items, tabs, and interactive elements

#### Interactive Components Requiring Test IDs:
1. **All buttons** (FdButton, native button elements)
2. **All form inputs** (FdInputForm, FdTextarea, FdSelect, etc.)
3. **All dropdowns and select components** (FdDropdown, FdActionMenu)
4. **All checkboxes and radio buttons** (FdCheckbox, FdRadio)
5. **All table actions** (edit, delete, view buttons)
6. **All navigation items** (menu items, tabs, sidebar links)
7. **All modal triggers and modal components**
8. **All file upload components** (FdFileUploader)

#### Test ID Implementation Patterns:
- **Use kebab-case** for test-id values (not camelCase)
- **Be descriptive** but concise (action + context)
- **Include context** when component appears multiple times on page
- **Use prop-based naming** to match component functionality

#### Accessibility Requirements:
- **ARIA labels** should complement test-id attributes
- **Screen reader support** for all interactive elements
- **Keyboard navigation** must work for all interactive components
- **Focus management** in modals and complex components

---

## Module Checklist

### Pre-Development:
- [ ] Define module structure following standard patterns
- [ ] Identify reusable components
- [ ] Plan store structure and state management
- [ ] Design responsive layout requirements

### Development:
- [ ] Create entry point following template
- [ ] Implement store with standard actions/mutations
- [ ] Build page header component
- [ ] Implement table component with actions
- [ ] Create modal components with proper target selectors
- [ ] Add minimal CSS overrides only
- [ ] Implement PHP view with proper asset registration
- [ ] **CRITICAL:** Ensure no full page scroll - use container scrolling
- [ ] **CRITICAL:** Set minimum page height of 600px
- [ ] **CRITICAL:** Use `calc(100vh - 80px)` for main content areas
- [ ] **Table Actions:** Choose correct pattern based on component types (uniform=actions prop, mixed=header slot)
- [ ] **File Management:** Implement FdFileUploader with proper validation and cleanup
- [ ] **Bulk Actions:** Include selection management for multi-row operations
- [ ] **Sidebar Navigation:** Use props structure (NOT slots) with proper event callbacks
- [ ] **Responsive Sidebar:** Implement collapsed state for small screens
- [ ] **Tabs Navigation:** Use options array prop with proper activeTab control
- [ ] **Conditional Tabs:** Implement v-if logic for permission-based or feature-based tabs
- [ ] **CRITICAL:** Add test-id attributes to ALL interactive components (buttons, inputs, dropdowns, etc.)
- [ ] **Test IDs:** Use kebab-case naming based on component prop names and functionality

### Post-Development:
- [ ] Test responsive design on all breakpoints
- [ ] Verify accessibility with screen readers
- [ ] Ensure consistent icon usage
- [ ] Validate error handling flows
- [ ] Test modal and dialog interactions
- [ ] Verify table functionality (filters, pagination, sorting)
- [ ] **CRITICAL:** Verify no full page scroll on any screen size
- [ ] **CRITICAL:** Test minimum height behavior (600px+)
- [ ] **CRITICAL:** Confirm internal scrolling works in tables/containers
- [ ] **Table Actions:** Test action patterns match component types (uniform vs mixed)
- [ ] **File Management:** Test file upload, validation, error handling, and cleanup
- [ ] **Bulk Actions:** Verify selection state management and confirmation dialogs
- [ ] **Sidebar Navigation:** Test responsive behavior and collapsed state on small screens
- [ ] **Sidebar Events:** Verify proper callback functions (NOT slots) and event handling
- [ ] **Tabs Navigation:** Test tab switching, active state management, and responsive overflow
- [ ] **Conditional Tabs:** Verify v-if logic works correctly for different user permissions/features
- [ ] **CRITICAL:** Verify ALL interactive components have proper test-id attributes
- [ ] **Test IDs:** Confirm test-id naming follows kebab-case convention and matches functionality
- [ ] **Accessibility:** Test keyboard navigation and screen reader compatibility
- [ ] **Test Coverage:** Ensure automated tests can target all interactive elements via test-ids

---

## Summary

This PRP file should be used as the standard guide for all new UI module development in the First Due system. It ensures consistency, maintainability, and adherence to established patterns.

### Learning Approach

**Primary Reference Files:**
1. **`site/client/js/itm_report.js`** - Main component structure and Vue setup
2. **`site/client/js/store/itm_report.js`** - Comprehensive store patterns and state management
3. **`codebase/site/client/js/components/itm_report/itm_upsert_modal.vue`** - Modal component composition
4. **`codebase/site/views/itmReport/index.php`** - PHP view integration and asset management
5. **`codebase/site/client/css/pages/_itm_report.scss`** - Minimal CSS override philosophy

### Development Philosophy

**Code Reuse Over Code Writing:**
- Study the reference implementations before writing new code
- Most functionality already exists in UI-Vue components
- Custom CSS should be minimal - leverage existing component styling
- Follow established patterns rather than creating new ones

**Key Principles:**
- **UI-Vue First** - Use library components whenever possible
- **Minimal CSS** - Only override when absolutely necessary
- **Store-Driven Logic** - Keep components simple, logic in stores
- **Pattern Consistency** - Follow established file structures and naming
- **Reference Learning** - Study existing code before implementing new features

By following these patterns and studying the reference files, new modules will maintain consistency with the existing First Due system architecture.