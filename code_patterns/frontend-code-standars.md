# First Due Frontend Development Rules
# This file ensures AI follows our established frontend patterns and code style

## CORE PRINCIPLES
- We are developing a fire department management system (First Due) using Vue.js, vanilla JavaScript, SCSS, and PHP templates
- Follow established code style guides with First Due specific conventions
- All code must be accessible, maintainable, and follow established patterns
- Modern ES6+ JavaScript with no semicolons
- Component-based architecture with reusable UI components

## JAVASCRIPT CODE STYLE (MANDATORY)
- 2 spaces indentation, NO tabs
- 80 characters per line maximum
- Use single quotes for strings
- NO semicolons (we use Babel for ES5 conversion)
- Opening braces go on the same line
- Declare one variable per statement
- Unix LF line endings only
- No trailing whitespace
- Add trailing commas to multi-line items (arrays, objects, imports)
- Use `lowerCamelCase` for variables, properties and function names
- Use `snake_case` for attributes when sending/receiving data to/from server
- Use `UpperCamelCase` for class names
- Use `UPPERCASE` for constants
- Suffix `El` to variables referencing DOM elements

## JAVASCRIPT PATTERNS (REAL EXAMPLES)
```javascript
// ✅ CORRECT - Variable naming and structure
const sidebarEl = document.querySelector('.js-sidebar')
const userIds = Yii::app()->request->getQuery('user_ids', [])
const isOffRoster = params['is_off_roster'] ?? false
const hasAccess = Yii::app()->user->checkAccess('createOffRoster')

// ✅ CORRECT - JavaScript hook class naming (use underscores)
const battDeptIdEl = document.querySelector('.js-batt_dept_id')
const dispatchUnitsEl = document.querySelector('.js-dispatch_units')
const searchInputEl = document.querySelector('.js-search_input')
const formControlEl = document.querySelector('.js-form_control')

// ✅ CORRECT - Constants and objects
const DATE_FORMAT = 'MMMM DD, YYYY'
const ACTION_CODES = {
  showAside: 'show_aside',
  hideAside: 'hide_aside',
}

// ✅ CORRECT - Function structure
export const getErrorMessage = (response) => {
  let res = {}
  
  if (typeof response === 'string') {
    res = JSON.parse(response)
  } else if (response !== null && response !== undefined) {
    res = response
  }
  
  return res.msg || 'A server error occurred.'
}

// ✅ CORRECT - Import/Export patterns
import { showAlert, showLoading } from './lib/sweet_alert'
import FdListMixin from './mixin/fd_list_mixin'
export { handleDisconnect, getErrorMessage }

// ✅ CORRECT - Complex module imports
import {
  CHART_TYPES,
  DECIMALS_MIN,
  DECIMALS_MAX,
  VALUE_FORMAT_CODES,
} from './components/report/report_constants'

// ✅ CORRECT - Async/await patterns
async initReport() {
  try {
    this.setIsLoading(true)
    const response = await request('/api/endpoint', {
      method: 'POST',
      data: this.requestData,
    })
    this.handleSuccess(response)
  } catch (error) {
    this.handleError(error)
  } finally {
    this.setIsLoading(false)
  }
}
```

## VUEX STORE PATTERNS (MANDATORY)
```javascript
// ✅ CORRECT - Store structure
const store = new Vuex.Store({
  state: {
    isLoading: false,
    selectedItems: [],
    modal: null,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setSelectedItems(state, items) {
      state.selectedItems = items
    },
  },
  actions: {
    async fetchData({ commit }, params) {
      commit('setIsLoading', true)
      try {
        const response = await request('/api/data', { params })
        commit('setSelectedItems', response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        commit('setIsLoading', false)
      }
    },
  },
  getters: {
    getSelectedItemsCount: (state) => state.selectedItems.length,
    getItemById: (state) => (id) => {
      return state.selectedItems.find(item => item.id === id)
    },
  },
})

// ✅ CORRECT - Namespaced store modules
export const modalStore = {
  namespaced: true,
  state: {
    activeModals: [],
  },
  mutations: {
    openModal(state, payload) {
      state.activeModals.push({
        code: payload.code,
        params: payload.params || {},
      })
    },
  },
  getters: {
    getActiveModalByCode: (state) => (code) => {
      return state.activeModals.find(modal => modal.code === code)
    },
  },
}
```

## VUE.JS PATTERNS (MANDATORY)
- NEVER use Vue shorthands (use full syntax)
- Always use `{{ varName }}` with spaces after/before braces
- Always add `()` to method calls in templates
- Script-first component structure
- Use longform for all Vue directives

### Vue Component Structure (REQUIRED ORDER):
```javascript
<script>
// imports first
import ComponentName from './component-name.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

// exports and constants
export const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export default {
  name: 'ComponentName',
  mixins: [baseMixin, workflowMixin],
  props: {
    size: {
      type: String,
      default: SIZES.medium,
      validator: (val) => {
        return Object.values(SIZES).includes(val)
      },
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isVisible: false,
      selectedItems: [],
    }
  },
  computed: {
    ...mapState(['isLoading', 'userData']),
    ...mapGetters(['getSelectedCount']),
    cssClasses() {
      return {
        'component-name': true,
        'is-small': this.size === SIZES.small,
        'is-loading': this.isLoading,
      }
    },
  },
  watch: {
    selectedItems: {
      handler(newItems, oldItems) {
        this.handleSelectionChange(newItems, oldItems)
      },
      deep: true,
    },
  },
  created() {
    // Non-reactive properties
    this.dropzone = null
    this.timeoutFunction = null
  },
  mounted() {
    this.initializeComponent()
    this.$nextTick(() => {
      this.updateLayout()
    })
  },
  beforeDestroy() {
    if (this.timeoutFunction) {
      clearTimeout(this.timeoutFunction)
    }
  },
  methods: {
    ...mapActions(['fetchData', 'updateSelection']),
    ...mapMutations(['setIsLoading']),
    handleClick(event) {
      this.$emit('click', event)
    },
    async initializeComponent() {
      try {
        await this.fetchData()
        this.setIsLoading(false)
      } catch (error) {
        this.handleError(error)
      }
    },
  },
  components: {
    ComponentName,
  },
}
</script>

<template>
  <div
    v-bind:class="cssClasses"
    v-on:click="handleClick($event)"
  >
    <div v-if="isLoading" class="loading-container">
      <span>Loading...</span>
    </div>
    <div v-else class="content-container">
      <slot v-bind:selectedItems="selectedItems"></slot>
    </div>
  </div>
</template>

<style scoped>
@import 'ui-css/components/component-name/component-name.css';
</style>
```

### Vue Template Patterns (MANDATORY):
```html
<!-- ✅ CORRECT - Full syntax, proper spacing -->
<button
  v-bind:type="type"
  v-bind:class="buttonClass"
  v-bind:disabled="disabled"
  v-on:click="handleClick($event)"
>
  {{ buttonText }}
</button>

<!-- ✅ CORRECT - Multi-line attributes with proper indentation -->
<div
  v-if="showContainer"
  v-bind:class="containerClass"
  v-bind:data-testid="testId"
  v-on:click.prevent="onClick($event)"
  v-on:keydown.enter.space.stop="onKeyDown($event)"
>
  <slot v-bind:params="params"></slot>
</div>

<!-- ✅ CORRECT - Conditional rendering -->
<transition name="modal" v-if="isActive">
  <teleport v-bind:to="targetSelector">
    <div class="modal-container">
      <slot name="header"></slot>
      <slot v-bind:params="params"></slot>
    </div>
  </teleport>
</transition>

<!-- ❌ INCORRECT - Shorthand syntax -->
<button :type="type" @click="handleClick">
  {{ buttonText }}
</button>
```

## MIXIN PATTERNS (REAL EXAMPLES)
```javascript
// ✅ CORRECT - Base mixin structure
const baseMixin = {
  data() {
    return {
      isLoading: false,
      errorMessage: null,
    }
  },
  methods: {
    handleError(error) {
      this.errorMessage = getErrorMessage(error)
      this.isLoading = false
    },
    resetError() {
      this.errorMessage = null
    },
  },
}

// ✅ CORRECT - Workflow mixin
const workflowMixin = {
  methods: {
    async processWorkflow(data) {
      this.isLoading = true
      try {
        const result = await this.executeWorkflowStep(data)
        this.handleWorkflowSuccess(result)
      } catch (error) {
        this.handleWorkflowError(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}

// ✅ CORRECT - Using mixins in components
export default {
  mixins: [baseMixin, workflowMixin],
  // ... component definition
}
```

## EVENT HANDLING PATTERNS (ADVANCED)
```javascript
// ✅ CORRECT - Event bus pattern
import { SystemNotificationEventBus } from './system_notification_event_bus'

// ✅ CORRECT - EventSource handling
initEventSource(resourceId) {
  if (typeof(EventSource) !== 'undefined') {
    let url = new URL(this.params.rootUrl + 'sse/connection/uni_sse')
    url.searchParams.append('cf_connect', JSON.stringify({
      'token': this.params.userToken,
    }))
    
    this.eventSource = new EventSource(url.toString())
    
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.handleEventSourceMessage(data)
    }
    
    this.eventSource.onerror = () => {
      this.handleEventSourceError()
    }
  }
}

// ✅ CORRECT - Complex event handling with debounce
created() {
  this.updateSectionsErrorsAndWarningsDebounce = debounce(
    this.updateSectionsErrorsAndWarnings,
    300
  )
}

// ✅ CORRECT - Window event listeners
mounted() {
  window.addEventListener('beforeunload', this.handleBeforeUnload)
  window.addEventListener('resize', this.handleResize)
}

beforeDestroy() {
  window.removeEventListener('beforeunload', this.handleBeforeUnload)
  window.removeEventListener('resize', this.handleResize)
}
```

## CSS/SCSS CODE STYLE (MANDATORY)
- 2 spaces indentation, NO tabs
- 80 characters per line maximum
- Use only lowercase
- No trailing whitespace
- No ID selectors
- Unix LF line endings
- Single quotes for strings
- Shorthand hex values (#fff not #ffffff)
- No units for zero values (margin: 0)
- No leading zeros (.5em not 0.5em)
- Avoid !important declarations
- Quote attribute values in selectors

### SCSS Naming Conventions:
- Use semantic class names (avoid color/size-based names)
- Prefer underscores to dashes in class names
- Use `.js-*` classes for JavaScript hooks (keep out of CSS)
- Use `js-some_name` format (underscores) for JavaScript hook classes, NOT `js-some-name` (dashes)
- Use BEM-like methodology for component styling

### SCSS Structure Pattern:
```scss
// ✅ CORRECT - Proper structure and naming
.component_name {
  // Positioning
  position: relative;
  top: 0;
  left: 0;
  
  // Box model
  display: block;
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  
  // Typography
  font-size: 14px;
  line-height: 1.5;
  color: $color-text-default;
  
  // Visual
  background-color: $color-background;
  border: 1px solid $color-border;
  border-radius: $border-default-radius;
  
  // Modifiers
  &.is-active {
    background-color: $color-base-blue;
  }
  
  &.is-disabled {
    opacity: .5;
    pointer-events: none;
  }
  
  // Nested elements
  .component_name_header {
    padding: 10px 15px;
    border-bottom: 1px solid $color-border;
  }
  
  .component_name_content {
    padding: 15px;
  }
}

// ✅ CORRECT - Table styling patterns
.tbl {
  width: 100%;
  max-width: 100%;
  margin-bottom: $spacer;
  border-collapse: separate;

  th {
    padding: $table-cell-padding;
    line-height: $line-height;
    vertical-align: top;
    text-align: left;
    border: 1px solid #e9e9e9;
    border-left: none;

    &:first-child {
      border-left: 1px solid #e9e9e9;
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  }

  td {
    padding: $table-cell-padding;
    line-height: $line-height;
    vertical-align: top;
    border-right: 1px solid #e9e9e9;

    &:last-child {
      border-right: none;
    }
  }
}

// ✅ CORRECT - Form styling patterns
.input-field {
  margin-bottom: 1em;

  label {
    display: block;
    margin-bottom: .25em;
    font-size: 15px;
  }

  input[type=text],
  input[type=email],
  input[type=tel],
  input[type=number],
  input[type=password] {
    display: block;
    width: 100%;
    appearance: none;
    padding: 0 10px;
    height: 32px;
    font-size: 14px;
    font-family: $font-stack-default;
    background-color: #fff;
    border: 1px solid hsla(0, 0%, 0%, .15);
    border-radius: 7px;
  }

  select,
  input,
  textarea {
    border-radius: 7px !important;
    border-color: $fi-input-border !important;
  }
}
```

### SCSS Variables Usage:
```scss
// ✅ CORRECT - Use established variables
$color-base-blue: #4f7dff;
$color-text-default: hsla(0, 0%, 0%, .8);
$border-default-radius: 14px;
$bp-medium-min-width: 768px;
$table-cell-padding: 8px;
$fi-input-border: #d9d9d9;

// ✅ CORRECT - Responsive breakpoints
@include breakpoint($bp-medium-up) {
  .component_name {
    display: flex;
    align-items: center;
  }
}

@media (min-width: $bp-medium-min-width) {
  .component_name {
    padding: 20px;
  }
}
```

## COMPONENT ARCHITECTURE PATTERNS
- Use component-based architecture with clear separation of concerns
- Import UI components from packages/ui-vue
- Use mixins for shared functionality
- Implement proper event handling with custom events
- Use props validation with custom validators
- Implement proper lifecycle management

### Component Import Patterns:
```javascript
// ✅ CORRECT - UI component imports
import {
  FdAlertBar,
  FdGrid,
  FdButton,
  FdEmptyState,
  FdInfoItem,
  FdNotification,
  FdSidebarMenu,
  FdLoader,
  breakpoints,
} from '@fdsu/ui-vue'

// ✅ CORRECT - Local component imports
import LayoutDefault from '@js/layouts/layout_default.vue'
import ResponseComponent from './components/incident_report_v4/response'
import PayrollSummaryComponent from './components/incident_report_v4/payroll_summary'

// ✅ CORRECT - Mixin imports
import FdListMixin from './mixin/fd_list_mixin'
import ListSavedViewMixin from './saved_view/mixin/list_saved_view_mixin'
import showConfirmMixin from './components/asset_management_common/common_functions'

// ✅ CORRECT - Library imports
import VanillaModal from 'vanilla-modal'
import moment from 'moment'
import Dropzone from 'dropzone'
import Pikaday from 'pikaday-time'
import { cloneDeep } from './lib/clone_deep'
import { request } from './lib/request'
```

## ADVANCED JAVASCRIPT PATTERNS
```javascript
// ✅ CORRECT - Module constants and permissions
const TRAINING_PERMISSIONS = {
  isAdmin: 'isAdmin',
  settings: 'manageTrainingSettings',
  categories: 'manageTrainingCategories',
  topics: 'manageTrainingTopics',
  dashboard: 'readTrainingDashboard',
}

const MENU_ITEMS = [
  {
    key: 'apparatusInformation',
    label: 'Information',
    icon: 'icon-glyph-unit-data',
    isVisible: true,
    hasPermission: true,
  },
  {
    key: 'apparatusSpecification',
    label: 'Specifications',
    icon: 'icon-glyph-reporting',
    isVisible: appParams.isUpdate,
    hasPermission: appParams.canManageSpecs,
  },
]

// ✅ CORRECT - Complex data processing
const processReportData = (data) => {
  const processedData = data
    .filter(item => item.isActive)
    .map(item => ({
      id: item.id,
      name: item.name,
      formattedDate: moment(item.createdAt).format('MM/DD/YYYY'),
      status: item.statusCode || 'pending',
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
  
  return processedData
}

// ✅ CORRECT - Error handling patterns
const handleApiError = (error) => {
  let errorMessage = 'An unexpected error occurred.'
  
  if (error.response) {
    const { status, data } = error.response
    if (status === 422 && data.errors) {
      errorMessage = Object.values(data.errors).flat().join(', ')
    } else if (data.message) {
      errorMessage = data.message
    }
  } else if (error.message) {
    errorMessage = error.message
  }
  
  return errorMessage
}

// ✅ CORRECT - Observer patterns
mounted() {
  this.resizeObserver = new ResizeObserver(() => {
    this.updateLayout()
  })
  
  this.mutationObserver = new MutationObserver(() => {
    this.handleDOMChanges()
  })
  
  this.resizeObserver.observe(this.$el)
  this.mutationObserver.observe(this.$el, {
    childList: true,
    subtree: true,
  })
}

beforeDestroy() {
  if (this.resizeObserver) {
    this.resizeObserver.disconnect()
  }
  if (this.mutationObserver) {
    this.mutationObserver.disconnect()
  }
}
```

## HTML PATTERNS (MANDATORY)
- Use double quotes for attributes
- Use `snake_case` for HTML attributes and form names
- Use `js-some_name` format (underscores) for JavaScript hook classes, NOT `js-some-name` (dashes)
- Always use `for` attribute on labels
- Use `length` attribute for text inputs
- Never use inline styles
- Use semantic HTML structure
- Always include `alt` attributes for images
- Use proper ARIA attributes for accessibility

### HTML Structure Patterns:
```html
<!-- ✅ CORRECT - Form structure with accessibility -->
<form role="form" aria-labelledby="form-title">
  <h2 id="form-title">Contact Information</h2>
  
  <div class="input-field">
    <label for="search_address" class="input-field__name">
      Search Address
      <span class="req_type" aria-label="required">*</span>
    </label>
    <input 
      type="text" 
      name="search_address" 
      id="search_address"
      length="255"
      class="form_control js-search_input"
      aria-required="true"
      aria-describedby="address-help"
    >
    <div id="address-help" class="input-field__help">
      Enter the full street address
    </div>
  </div>
  
  <div class="checkbox">
    <input 
      type="checkbox" 
      id="is_active" 
      name="is_active"
      v-bind:checked="isActive"
    >
    <label for="is_active" class="checkbox-label">
      Is Active
    </label>
  </div>
</form>

<!-- ✅ CORRECT - Table structure with accessibility -->
<table class="tbl" role="table" aria-label="Personnel Data">
  <thead>
    <tr role="row">
      <th role="columnheader" scope="col">Name</th>
      <th role="columnheader" scope="col">Status</th>
      <th role="columnheader" scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row">
      <td role="cell">John Doe</td>
      <td role="cell">Active</td>
      <td role="cell" class="actcol">
        <a href="/edit/1" aria-label="Edit John Doe">
          <i class="icon-edit" aria-hidden="true"></i>
        </a>
      </td>
    </tr>
  </tbody>
</table>
```

## PHP TEMPLATE PATTERNS (YII FRAMEWORK)
- Use PHP template syntax for server-side rendering
- Register assets using AssetsMap
- Use Yii::t() for translations
- Use CHtml::encode() for output encoding
- Use proper script registration patterns

### PHP Template Structure:
```php
<?php
// ✅ CORRECT - Page setup with proper escaping
$this->pageTitle = Yii::t('common', 'Page Title');
$assetsMap = new AssetsMap;

// ✅ CORRECT - Script registration with proper positioning
Yii::app()->clientScript->registerScriptFile(
    $assetsMap->get('vendors.js'), 
    CClientScript::POS_END
);
Yii::app()->clientScript->registerCssFile($assetsMap->get('style.css'));

// ✅ CORRECT - Inline JavaScript with proper escaping
$appParamsJs = <<<EOD
window.appParams = $tableParams;
EOD;
Yii::app()->clientScript->registerScript(
    'appParamsJs', 
    $appParamsJs, 
    CClientScript::POS_HEAD
);

// ✅ CORRECT - User client type detection
$userClient = (new UserParam)->getUserClient(Yii::app()->user->id ?? 0);
if (($userClient->user_type_code ?? null) === AdminAccount::TYPE_BUSINESS) {
    $signoutUrl = '/business/auth/signout';
} else {
    $signoutUrl = '/auth/signout';
}
?>

<!-- ✅ CORRECT - HTML structure with Vue integration -->
<div id="app" class="fdsu_list_module_container">
    <component-name/>
</div>

<?= $this->renderPartial('_partial_name'); ?>
<?= $this->renderPartial('/commons/_list_actions_bar'); ?>
```

## PERFORMANCE PATTERNS
- Use proper component lifecycle hooks
- Implement lazy loading for large components
- Use proper key attributes in v-for loops
- Avoid unnecessary re-renders with computed properties
- Use proper asset bundling and minification
- Implement proper memory cleanup in beforeDestroy
- Use debouncing for expensive operations
- Implement proper caching strategies

## TESTING PATTERNS
- Use data-testid attributes for testing
- Implement proper test isolation
- Use descriptive test names
- Test user interactions, not implementation details

```html
<!-- ✅ CORRECT - Testing attributes -->
<button
  v-bind:data-testid="testId"
  v-bind:class="buttonClass"
  v-on:click="handleClick($event)"
>
  {{ buttonText }}
</button>
```

## COMMON ANTI-PATTERNS TO AVOID
- ❌ Using jQuery (prefer vanilla JavaScript)
- ❌ Using Vue shorthands (always use full syntax)
- ❌ Using semicolons in JavaScript
- ❌ Using ID selectors in CSS
- ❌ Using inline styles
- ❌ Using camelCase in HTML attributes
- ❌ Using snake_case in JavaScript variables
- ❌ Using dashes in JavaScript hook classes (use `js-some_name` not `js-some-name`)
- ❌ Missing prop validation in Vue components
- ❌ Not using established color variables in SCSS
- ❌ Not registering assets through AssetsMap
- ❌ Not cleaning up event listeners in beforeDestroy
- ❌ Not using proper error handling patterns
- ❌ Not implementing proper loading states
- ❌ Missing accessibility attributes

Remember: Always follow the established patterns from our 6000+ files and maintain consistency with the existing codebase!
