# First Due PHP Development Rules
# This file ensures AI follows our established PHP patterns and code style

## CORE PRINCIPLES
- We are developing a fire department management system (First Due) using Yii Framework
- Follow PSR-12 compatible style with First Due specific conventions
- All code must be secure, maintainable, and follow established patterns
- Multi-tenant architecture with client_code filtering

## CODE STYLE (MANDATORY)
- 4 spaces indentation, NO tabs
- 80 characters per line maximum
- Files MUST use only UTF-8 without BOM
- Unix LF (linefeed) line ending only
- No trailing whitespace
- Single space before and after operators (=, =>, etc)
- Always use `<?php` or `<?=` tags
- PHP-only files should NOT have trailing `?>`

## NAMING CONVENTIONS (STRICT RULES)
- **Classes**: PascalCase (Personnel, ScheduleController, CDbCriteria)
- **Methods**: camelCase (actionGetList, getUserParams, limitByClient)
- **Variables**: camelCase (clientCode, userIds, battDeptId, startTime)
- **Constants**: UPPER_SNAKE_CASE (MAX_ROWS_TO_DOWNLOAD, DUMMY_VALUE)
- **Array keys**: snake_case ('client_code', 'user_id', 'start_time')
- **Database fields**: snake_case (client_code, created_at, is_active)
- **Properties**: camelCase (public $clientCode, private $userId)

## CONTROLLER PATTERNS (MANDATORY)

### Access Control Pattern:
```php
public function accessRules()
{
    return CMap::mergeArray([
        [
            'allow',
            'actions' => ['list', 'getList'],
            'expression' => "Yii::app()->user->checkAccess('readPermission')",
        ],
        [
            'allow',
            'actions' => ['create', 'update'],
            'expression' => "Yii::app()->user->checkAccess('updatePermission')",
        ],
        [
            'allow',
            'actions' => ['delete'],
            'expression' => "Yii::app()->user->checkAccess('deletePermission')",
        ],
    ], parent::accessRules());
}
```

### AJAX Response Pattern:
```php
public function actionGetData()
{
    $this->guardOnlyAjaxRequest();
    
    $ret = new \stdClass;
    $ret->success = false;
    $ret->errorMsg = '';
    $ret->data = [];
    
    try {
        // Business logic here
        $ret->success = true;
        $ret->data = $result;
    } catch (Exception $e) {
        $ret->errorMsg = $e->getMessage();
    }
    
    (new JsonResponse($ret))->send();
    Yii::app()->end();
}

// NOTE: JsonResponse component is automatically available, no import needed

/**
 * Don't allow non-Ajax requests for a given action.
 * 
 * Doesn't fire if `YII_DEBUG` is set.
 */
protected function guardOnlyAjaxRequest(): void
{
    if (!YII_DEBUG && !Yii::app()->request->isAjaxRequest) {
        $this->redirect('/');
    }
}

### JsonResponse Usage Patterns:
```php
// Basic response
(new JsonResponse($ret))->send();

// Response with custom status code
(new JsonResponse($ret))
    ->withStatus(422)  // Validation errors
    ->send();

// Response with custom headers
(new JsonResponse($ret))
    ->withHeaders(['X-Custom-Header' => 'value'])
    ->send();

// Response with JSON encoding flags (for special characters)
(new JsonResponse($ret))
    ->withJsonFlags(JSON_HEX_APOS)
    ->send();

// Legacy CJSON encoder (deprecated - for backwards compatibility)
(new JsonResponse($ret))
    ->withEncoder(['CJSON', 'encode'])
    ->send();
```

### When to Use Different HTTP Status Codes:
- **200 (default)**: Successful operations
- **400**: General client errors (when $ret->success = false)
- **422**: Validation errors (when form validation fails)
- **404**: Resource not found
- **403**: Access denied/permission errors

### JsonResponse Best Practices:
- **Always call `Yii::app()->end();`** after sending the response
- **Use `guardOnlyAjaxRequest()`** to protect AJAX-only actions
- **Create `$ret = new \stdClass`** objects for response data
- **Set appropriate status codes** using `withStatus()` for error conditions
- **Use fluent interface** for chaining multiple configurations

### Common Action Patterns:
```php
// List action with table configuration
public function actionList()
{
    $userParams = $this->getUserParams();
    
    $tableParams = [
        'permissions' => $userParams['permissions'],
        'clientCode' => $userParams['clientCode'],
    ];
    
    $this->render('list', [
        'tableParams' => json_encode($tableParams, JSON_HEX_APOS),
        'permissions' => $userParams['permissions'],
    ]);
}

// Get list action for AJAX
public function actionGetList()
{
    $this->layout = false;
    
    if (!YII_DEBUG && !Yii::app()->request->isAjaxRequest) {
        $this->redirect('/');
    }
    
    $ret = new \stdClass;
    $ret->data = [];
    $ret->totalPages = 0;
    
    // Implementation here
    
    header('Content-Type: application/json');
    $this->renderText(CJSON::encode($ret));
    Yii::app()->end();
}
```

### User Parameter Pattern:
```php
private function getUserParams(): array
{
    $isSuperAdmin = Yii::app()->user->checkAccess(UserRole::SUPER_ADMIN);
    $clientCode = null;
    
    if (!$isSuperAdmin) {
        $userClient = (new UserParam)->getUserClient(Yii::app()->user->id);
        $clientCode = $userClient->client_code;
    }
    
    return [
        'isSuperAdmin' => $isSuperAdmin,
        'isAdmin' => Yii::app()->user->checkAccess(UserRole::ADMIN),
        'userId' => Yii::app()->user->id,
        'clientCode' => $clientCode,
        'permissions' => [
            'createPermission' => Yii::app()->user->checkAccess('createPermission'),
            'updatePermission' => Yii::app()->user->checkAccess('updatePermission'),
            'deletePermission' => Yii::app()->user->checkAccess('deletePermission'),
        ],
    ];
}
```

## MODEL PATTERNS (MANDATORY)

### Critical Database Table References:
- **Users table**: `admin_account` (NOT `users` or `user`)
- **User ID reference**: Always use `Yii::app()->user->id` (references admin_account.id)
- **Client filtering**: Use `client_code` field for multi-tenancy

### Constants Pattern:
```php
class ModelName extends BaseModel
{
    // Status constants
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_PENDING = 'pending';
    public const STATUS_CANCELLED = 'cancelled';
    
    // Type constants
    public const TYPE_INSPECTION = 'inspection';
    public const TYPE_MAINTENANCE = 'maintenance';
    
    // Limits and constraints
    public const MAX_ROWS = 1000;
    public const DEFAULT_TIMEOUT = 60000;
    public const NAME_MAX_LENGTH = 255;
    
    // Scenarios (CRITICAL FOR AUDIT FIELDS PATTERN)
    public const SCENARIO_USER_CREATE = 'userCreate';
    public const SCENARIO_USER_UPDATE = 'userUpdate';
    public const SCENARIO_SYSTEM_CREATE = 'systemCreate';
    public const SCENARIO_SYSTEM_UPDATE = 'systemUpdate';
}
```

### Model Structure Pattern:
```php
class ModelName extends BaseModel
{
    // Public properties for form data
    public $custom_field;
    public $calculated_field;
    
    // Private properties for internal use
    private $oldAttrs = [];
    private $customData = [];
    
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
    
    public function tableName()
    {
        return 'app.table_name';
    }
    
    public function rules()
    {
        return [
            ['required_field', 'required'],
            ['email_field', 'email'],
            ['numeric_field', 'numerical', 'integerOnly' => true],
            ['string_field', 'length', 'max' => 255],
            [
                'foreign_key_field',
                'exist',
                'className' => 'RelatedModel',
                'attributeName' => 'id',
            ],
            ['custom_field', 'validateCustomField'],
        ];
    }
    
    protected function beforeSave()
    {
        if ($this->isNewRecord) {
            $this->created_at = new CDbExpression('LOCALTIMESTAMP');
            
            // CRITICAL: Only set created_by in userCreate scenario
            // Our users table is admin_account, reference via Yii::app()->user->id
            if ($this->scenario === self::SCENARIO_USER_CREATE) {
                $this->created_by = Yii::app()->user->id;
            }
        }
        
        $this->updated_at = new CDbExpression('LOCALTIMESTAMP');
        
        // CRITICAL: Only set updated_by for user-initiated updates
        // System operations (imports, background jobs) should not set updated_by
        if (in_array($this->scenario, [self::SCENARIO_USER_CREATE, self::SCENARIO_USER_UPDATE])) {
            $this->updated_by = Yii::app()->user->id;
        }
        
        return parent::beforeSave();
    }
    
    public function attributeLabels()
    {
        return [
            'field_name' => Yii::t('common', 'Field Label'),
            'another_field' => Yii::t('common', 'Another Label'),
        ];
    }
}
```

### Critical Audit Fields Pattern (MANDATORY):
```php
// ALWAYS define scenarios as constants and use them properly
public const SCENARIO_USER_CREATE = 'userCreate';
public const SCENARIO_USER_UPDATE = 'userUpdate';
public const SCENARIO_SYSTEM_CREATE = 'systemCreate';
public const SCENARIO_SYSTEM_UPDATE = 'systemUpdate';

// In controller actions for user-initiated creates:
$model = new Model();
$model->scenario = Model::SCENARIO_USER_CREATE;  // Sets both created_by and updated_by
$model->attributes = $formData;
$model->save();

// In controller actions for user-initiated updates:
$model = Model::model()->findByPk($id);
$model->scenario = Model::SCENARIO_USER_UPDATE;  // Sets updated_by only
$model->attributes = $formData;
$model->save();

// For system-generated records (imports, background processes):
$model = new Model();
$model->scenario = Model::SCENARIO_SYSTEM_CREATE;  // Sets neither created_by nor updated_by
$model->attributes = $systemData;
$model->save();

// For system updates (background processes, automated updates):
$model = Model::model()->findByPk($id);
$model->scenario = Model::SCENARIO_SYSTEM_UPDATE;  // Sets neither created_by nor updated_by
$model->attributes = $systemData;
$model->save();
```

### Rules for Scenario Usage:
- **SCENARIO_USER_CREATE**: Use when user explicitly creates a record (forms, API) - sets both created_by and updated_by
- **SCENARIO_USER_UPDATE**: Use when user explicitly updates a record (forms, API) - sets updated_by only
- **SCENARIO_SYSTEM_CREATE**: Use for system-generated records (imports, background jobs) - sets neither created_by nor updated_by
- **SCENARIO_SYSTEM_UPDATE**: Use for system updates (background processes, automated updates) - sets neither created_by nor updated_by
- **CRITICAL**: Only user scenarios (SCENARIO_USER_CREATE, SCENARIO_USER_UPDATE) set audit fields automatically

### Multi-Tenancy Pattern (CRITICAL):
```php
// ALWAYS include client_code filtering
public function limitByClient($userId = null)
{
    if ($userId === null) {
        $userId = Yii::app()->user->id;
    }
    
    $userClient = (new UserParam)->getUserClient($userId);
    $this->getDbCriteria()->mergeWith([
        'condition' => 't.client_code = :client_code',
        'params' => [':client_code' => $userClient->client_code],
    ]);
    
    return $this;
}

public function limitByUser($userId = null)
{
    if ($userId === null) {
        $userId = Yii::app()->user->id;
    }
    
    // Add user-specific filtering logic
    $this->limitByClient($userId);
    
    return $this;
}
```

### Validation Patterns:
```php
public function validateCustomField($attribute)
{
    if ($this->hasErrors()) {
        return;
    }
    
    // Custom validation logic
    if (!$this->isValidCondition()) {
        $this->addError($attribute, Yii::t('common', 'Error message'));
    }
}

public function validateDateRange($attribute, $params)
{
    $startField = $params['startField'] ?? null;
    $endField = $params['endField'] ?? null;
    
    if ($startField && $endField && $this->$startField && $this->$endField) {
        if (strtotime($this->$startField) > strtotime($this->$endField)) {
            $this->addError($attribute, Yii::t('common', 'End date must be after start date'));
        }
    }
}
```

## QUERY PATTERNS (CRITICAL)

### Database Connection Pattern:
```php
// Read operations - use dbRead
$result = Yii::app()
    ->dbRead
    ->createCommand($sql)
    ->bindValues($params)
    ->setFetchMode(PDO::FETCH_OBJ)
    ->queryAll();

// Write operations - use dbWrite
$rowsAffected = Yii::app()
    ->dbWrite
    ->createCommand($sql)
    ->bindValues($params)
    ->execute();

// Single value queries
$count = Yii::app()
    ->dbRead
    ->createCommand($sql)
    ->bindValues($params)
    ->queryScalar();
```

### Parameter Binding (MANDATORY):
```php
// ✅ CORRECT - Always use parameter binding
$sql = 'SELECT id, name, status FROM table_name WHERE client_code = :client_code AND id = :id';
$params = [
    ':client_code' => $clientCode,
    ':id' => $id,
];

// ❌ NEVER concatenate values directly into SQL
$sql = 'SELECT id, name FROM table_name WHERE client_code = \'' . $clientCode . '\'';
```

### Complex Query Building:
```php
public function getComplexData($filters, $clientCode)
{
    $conditions = ['t.client_code = :client_code'];
    $params = [':client_code' => $clientCode];
    
    if (!empty($filters['status'])) {
        $conditions[] = 't.status_code = :status';
        $params[':status'] = $filters['status'];
    }
    
    if (!empty($filters['date_from'])) {
        $conditions[] = 't.created_at >= :date_from';
        $params[':date_from'] = $filters['date_from'];
    }
    
    $whereClause = 'WHERE ' . implode(' AND ', $conditions);
    
    $sql = "
        SELECT
            t.id,
            t.name,
            r.related_field
        FROM
            table_name t
                LEFT JOIN related_table r ON (t.id = r.table_id)
        {$whereClause}
        ORDER BY
            t.created_at DESC
    ";
    
    return Yii::app()
        ->dbRead
        ->createCommand($sql)
        ->bindValues($params)
        ->setFetchMode(PDO::FETCH_OBJ)
        ->queryAll();
}
```

## SECURITY PATTERNS (MANDATORY)

### Input Validation:
```php
// Always validate and sanitize input
$jsonData = file_get_contents('php://input');
if ($jsonData) {
    $data = json_decode($jsonData, true);
    
    // Validate required fields
    if (empty($data['required_field'])) {
        throw new InvalidArgumentException('Required field missing');
    }
    
    // Sanitize and validate
    $cleanData = [
        'field1' => CHtml::encode($data['field1']),
        'field2' => (int) $data['field2'],
    ];
}
```

### Permission Checking:
```php
// Always check permissions before operations
if (!Yii::app()->user->checkAccess('requiredPermission')) {
    throw new CHttpException(403, Yii::t('common', 'Access denied'));
}

// Check ownership for updates
$model = Model::model()->limitByUser()->findByPk($id);
if (!$model) {
    throw new CHttpException(404, Yii::t('common', 'Record not found'));
}
```

## ERROR HANDLING PATTERNS

### Standard Error Response:
```php
try {
    // Operation logic
    $response->success = true;
    $response->data = $result;
} catch (CDbException $e) {
    Yii::log($e->getMessage(), CLogger::LEVEL_ERROR, 'Database');
    $response->errorMsg = Yii::t('common', 'Database error occurred');
} catch (Exception $e) {
    Yii::log($e->getMessage(), CLogger::LEVEL_ERROR, 'General');
    $response->errorMsg = Yii::t('common', 'An error occurred');
}
```

### Logging Pattern:
```php
Yii::log(
    "Error message: {$e->getMessage()}",
    CLogger::LEVEL_ERROR,
    'ControllerName::actionName'
);
```

## COMMON FIRST DUE PATTERNS

### File Upload Pattern:
```php
public function actionUploadAttachment()
{
    $ret = new \stdClass;
    $ret->success = false;
    $ret->errorMsg = '';
    $ret->fileId = null;
    
    try {
        $uploadedFile = CUploadedFile::getInstanceByName('file');
        
        if ($uploadedFile) {
            // Validate file
            $allowedExtensions = ['.pdf', '.jpg', '.png', '.doc'];
            $extension = strtolower(strrchr($uploadedFile->name, '.'));
            
            if (!in_array($extension, $allowedExtensions)) {
                throw new Exception('Invalid file type');
            }
            
            // Process upload
            $fileId = $this->processFileUpload($uploadedFile);
            
            $ret->success = true;
            $ret->fileId = $fileId;
        }
    } catch (Exception $e) {
        $ret->errorMsg = $e->getMessage();
    }
    
    (new JsonResponse($ret))->send();
    Yii::app()->end();
}
```

### Bulk Operations Pattern:
```php
public function actionBulkUpdate()
{
    $this->guardOnlyAjaxRequest();
    
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);
    
    $response = new \stdClass;
    $response->success = false;
    $response->updated = 0;
    $response->errors = [];
    
    if (!empty($data['ids']) && !empty($data['updates'])) {
        $transaction = Yii::app()->db->beginTransaction();
        
        try {
            foreach ($data['ids'] as $id) {
                $model = Model::model()->limitByUser()->findByPk($id);
                
                if ($model) {
                    $model->attributes = $data['updates'];
                    
                    if ($model->save()) {
                        $response->updated++;
                    } else {
                        $response->errors[] = "ID {$id}: " . implode(', ', $model->getErrors());
                    }
                }
            }
            
            $transaction->commit();
            $response->success = true;
        } catch (Exception $e) {
            $transaction->rollback();
            $response->errors[] = $e->getMessage();
        }
    }
    
    (new JsonResponse($response))->send();
    Yii::app()->end();
}
```

## YII RBAC (ROLE-BASED ACCESS CONTROL) PATTERNS (CRITICAL)

### Permission Management Files (MANDATORY UPDATES)

#### When Adding New Permissions - Required File Updates:
1. **Database Migration** (see sql-rules.mdc for migration patterns)
2. **Permission.php** (defines permission names and descriptions)  
3. **PermissionGroup.php** (organizes permissions for UI display)

#### Permission.php Updates (CRITICAL):
```php
class Permission
{
    // 1. Add constants for frequently used permissions
    const MANAGE_NEW_MODULE = 'manageNewModule';
    const CREATE_NEW_MODULE = 'createNewModule';
    
    public static $list = [
        'web' => [
            'name' => 'Website Permissions',
            'items' => [
                // 2. Add to appropriate section in $list array
                [
                    'name' => 'New Module Name',
                    'items' => [
                        'createNewModule' => 'New Module - Create',
                        'readNewModule' => 'New Module - Read',
                        'updateNewModule' => 'New Module - Update',
                        'deleteNewModule' => 'New Module - Delete',
                        'readNewModuleSavedView' => 'New Module Saved View - Read',
                        'createNewModuleSavedView' => 'New Module Saved View - Create',
                        'updateNewModuleSavedView' => 'New Module Saved View - Update',
                        'deleteNewModuleSavedView' => 'New Module Saved View - Delete',
                    ],
                ],
            ],
        ],
    ];
}
```

#### PermissionGroup.php Updates (CRITICAL):
```php
class PermissionGroup
{
    // 1. Add group constants
    const GROUP_NEW_MODULE = 'newModule';
    
    public function __construct()
    {
        // 2. Add to appropriate section
        $this->sections = [
            self::SECTION_ADMIN => [
                'name' => Yii::t('common', 'Admin'),
                'groups' => [
                    // Add your new group here
                    self::GROUP_NEW_MODULE => [
                        'name' => Yii::t('common', 'New Module'),
                        'permissions' => [
                            'createNewModule',
                            'readNewModule', 
                            'updateNewModule',
                            'deleteNewModule',
                            'readNewModuleSavedView',
                            'createNewModuleSavedView',
                            'updateNewModuleSavedView',
                            'deleteNewModuleSavedView',
                        ],
                    ],
                ],
            ],
        ];
    }
}
```

#### Complete New Permission Workflow:
```php
// Step 1: Migration (see sql-rules.mdc for RBAC migration patterns)
// Step 2: Permission.php (add to $list array)
// Step 3: PermissionGroup.php (add to appropriate section)
```

#### Permission Naming Rules in Permission.php:
```php
// Standard CRUD permissions
'createModuleName' => 'Module Name - Create',
'readModuleName' => 'Module Name - Read', 
'updateModuleName' => 'Module Name - Update',
'deleteModuleName' => 'Module Name - Delete',

// Saved view permissions (if applicable)
'readModuleNameSavedView' => 'Module Name Saved View - Read',
'createModuleNameSavedView' => 'Module Name Saved View - Create',
'updateModuleNameSavedView' => 'Module Name Saved View - Update',
'deleteModuleNameSavedView' => 'Module Name Saved View - Delete',

// Special action permissions
'exportModuleName' => 'Module Name - Export',
'approveModuleName' => 'Module Name - Approve',
'completeModuleName' => 'Module Name - Complete',
'archiveModuleName' => 'Module Name - Archive',

// Management permissions
'manageModuleNameSetup' => 'Module Name - Setup',
'manageModuleNameSettings' => 'Module Name - Settings',
```

#### PermissionGroup Section Organization:
```php
// Common sections to place permissions in:
self::SECTION_ADMIN,           // Administrative functions
self::SECTION_ASSETS,          // Asset management
self::SECTION_COMMUNITY_CONNECT, // Community features
self::SECTION_DASHBOARD,       // Dashboard permissions
self::SECTION_DISPATCH,        // Dispatch operations
self::SECTION_EMS,            // EMS/Medical
self::SECTION_FIRE_DEPT,      // Fire department operations
self::SECTION_FIRE_INSPECTION, // Fire inspections
self::SECTION_HYDRANT,        // Hydrant management
self::SECTION_INCIDENT,       // Incident management
self::SECTION_PERSONNEL,      // Personnel management
self::SECTION_PREPLAN,        // Pre-planning
self::SECTION_REPORTS,        // Reporting
self::SECTION_SCHEDULING,     // Scheduling
self::SECTION_TRAINING,       // Training
```

#### Permission Description Patterns:
```php
// Entity permissions
'Module Name - Create'
'Module Name - Read'
'Module Name - Update' 
'Module Name - Delete'

// Saved view permissions
'Module Name Saved View - Create'
'Module Name Saved View - Read'
'Module Name Saved View - Update'
'Module Name Saved View - Delete'

// Action permissions  
'Module Name - Export'
'Module Name - Complete'
'Module Name - Authorize'
'Module Name - Archive'

// Setup permissions
'Module Name - Setup'
'Module Name - Settings'
'Module Name - Manage'
```

#### UI Integration Validation:
```php
// After adding permissions, verify they appear in:
// 1. Role management interface (/roles)
// 2. Permission reports
// 3. User assignment screens
// 4. Permission group CSV exports

// Test with:
$permissions = ['createNewModule', 'readNewModule'];
$names = Permission::getNames($permissions);
$descriptions = Permission::getDescriptions($permissions);
$friendlyNames = Permission::getFriendlyNames($permissions);
```

#### New Permission Implementation Checklist (PHP Files):
1. ✅ **Create Migration** (see sql-rules.mdc for RBAC migration patterns)
2. ✅ **Add to Permission.php** $list array with proper descriptions  
3. ✅ **Add to PermissionGroup.php** in appropriate section/group
4. ✅ **Add constants** in Permission.php for frequently used permissions
5. ✅ **Follow naming patterns** (create/read/update/delete{ModuleName})
6. ✅ **Use consistent descriptions** ("Module Name - Action" format)
7. ✅ **Test UI appearance** in role management interface
8. ✅ **Verify permission methods** (getNames, getDescriptions, getFriendlyNames)
9. ✅ **Update controller accessRules()** to use new permissions

#### Common Permission Patterns by Module Type:

##### Standard CRUD Module:
```php
// Permission.php
'createModuleName' => 'Module Name - Create',
'readModuleName' => 'Module Name - Read',
'updateModuleName' => 'Module Name - Update', 
'deleteModuleName' => 'Module Name - Delete',

// PermissionGroup.php
'permissions' => [
    'createModuleName',
    'readModuleName',
    'updateModuleName', 
    'deleteModuleName',
],
```

##### Module with Saved Views:
```php
// Add these additional permissions
'readModuleNameSavedView' => 'Module Name Saved View - Read',
'createModuleNameSavedView' => 'Module Name Saved View - Create',
'updateModuleNameSavedView' => 'Module Name Saved View - Update',
'deleteModuleNameSavedView' => 'Module Name Saved View - Delete',
```

##### Workflow Module (with status management):
```php
// Add these workflow-specific permissions
'completeModuleName' => 'Module Name - Complete',
'approveModuleName' => 'Module Name - Approve', 
'rejectModuleName' => 'Module Name - Reject',
'incompleteModuleName' => 'Module Name - Mark Incomplete',
```

##### Setup/Configuration Module:
```php
// Management-style permissions
'manageModuleNameSetup' => 'Module Name - Setup',
'manageModuleNameSettings' => 'Module Name - Settings',
'manageModuleNameConfig' => 'Module Name - Configuration',
```

## YII RBAC (ROLE-BASED ACCESS CONTROL) PATTERNS (CRITICAL)

### Role Assignment in Code:
```php
// Assign role to user
$userRole = new UserRole();
$userRole->assign(Yii::app()->dbWrite, $userId, $roleName);

// Check if user has permission
$hasPermission = Yii::app()->user->checkAccess('permissionName');

// Check if user has role
$userRole = new UserRole();
$hasRole = $userRole->isUserInRole($userId, UserRole::ADMIN);
```

### Permission Check Patterns in Controllers:
```php
// Single permission check
public function accessRules()
{
    return CMap::mergeArray([
        [
            'allow',
            'actions' => ['index', 'list'],
            'expression' => "Yii::app()->user->checkAccess('read{ModuleName}')",
        ],
        [
            'allow',
            'actions' => ['create'],
            'expression' => "Yii::app()->user->checkAccess('create{ModuleName}')",
        ],
        [
            'allow',
            'actions' => ['update', 'edit'],
            'expression' => "Yii::app()->user->checkAccess('update{ModuleName}')",
        ],
        [
            'allow',
            'actions' => ['delete'],
            'expression' => "Yii::app()->user->checkAccess('delete{ModuleName}')",
        ],
    ], parent::accessRules());
}

// Multiple permission check (OR logic)
'expression' => "
    Yii::app()->user->checkAccess('read{ModuleName}') 
        || Yii::app()->user->checkAccess('update{ModuleName}')
",

// Role-based check
'expression' => "Yii::app()->user->checkAccess('" . UserRole::ADMIN . "')",
```

### Menu Integration with Permissions:
```php
[
    'label' => Yii::t('nav', '{Module Name} List'),
    'url' => ['/{module-name}/index'],
    'visible' => $userPermission->check('read{ModuleName}'),
],
[
    'label' => Yii::t('nav', '{Module Name} Setup'),
    'url' => ['/{module-name}Setup'],
    'visible' => $userPermission->check('manage{ModuleName}Setup'),
],
```

### UserParam Pattern for Client Access:
```php
private function getUserParams(): array
{
    $isSuperAdmin = Yii::app()->user->checkAccess(UserRole::SUPER_ADMIN);
    $clientCode = null;
    
    if (!$isSuperAdmin) {
        $userClient = (new UserParam)->getUserClient(Yii::app()->user->id);
        $clientCode = $userClient->client_code;
    }
    
    return [
        'isSuperAdmin' => $isSuperAdmin,
        'isAdmin' => Yii::app()->user->checkAccess(UserRole::ADMIN),
        'userId' => Yii::app()->user->id,
        'clientCode' => $clientCode,
        'permissions' => [
            'create{ModuleName}' => Yii::app()->user->checkAccess('create{ModuleName}'),
            'update{ModuleName}' => Yii::app()->user->checkAccess('update{ModuleName}'),
            'delete{ModuleName}' => Yii::app()->user->checkAccess('delete{ModuleName}'),
        ],
    ];
}
```

### Cache Invalidation for Cached Queries (CRITICAL)

#### UserParam::getUserClient Cache Pattern:
```php
// This function caches complex database queries
public function getUserClient(int $userId)
{
    // Queries: client, admin_account, county tables
    // Cache key: 'user_client_' . $userId
    // Cache tags: CacheTags::CLIENT, user-specific, client-specific
    
    // CACHED COLUMNS (cache invalidation needed if these are modified):
    // From admin_account: client_code, public_name, user_type_code, limit_dispatches, business_id, etc.
    // From client: country_code, county_code, use_new_sizeup, slug, use_new_preplan, etc. 
    // From county: state_code
    // Full list: check the getUserClient SELECT statement for exact columns
}
```

#### When to Clear CLIENT Cache (MANDATORY):
```php
// ONLY clear CLIENT cache when the cached query is affected:
Yii::app()->cacheWrite->clear(CacheTags::CLIENT);

// Required ONLY when:
// 1. Modifying columns that ARE USED in getUserClient query
// 2. Adding NEW columns TO the getUserClient SELECT statement
// 3. Removing columns that ARE USED in getUserClient query
// 4. Changing getUserClient query structure (JOINs, WHERE, etc.)
// 5. Modifying related table columns that ARE SELECTED in getUserClient
```

#### Migration Cache Invalidation Pattern:
```php
// For migration patterns, see sql-rules.mdc
// Key point: Add cache invalidation when modifying cached query dependencies
Yii::app()->cacheWrite->clear(CacheTags::CLIENT);
```

#### Model Cache Invalidation Pattern:
```php
class Client extends BaseModel
{
    protected function afterSave()
    {
        // Clear cache when client data changes
        Yii::app()->cacheWrite->clear(CacheTags::CLIENT);
        return parent::afterSave();
    }
}

class AdminAccount extends BaseModel  
{
    protected function afterSave()
    {
        // Clear cache when user data changes
        Yii::app()->cacheWrite->clear(CacheTags::CLIENT);
        return parent::afterSave();
    }
}
```

#### Cache Tags Pattern (Understanding the Impact):
```php
// getUserClient uses these cache tags:
$cacheTags = [
    $userCacheTag,              // User-specific cache
    CacheTags::CLIENT,          // Client-wide cache (THIS IS KEY!)
    $clientSpecificTag          // Client-specific cache
];

// When you clear CacheTags::CLIENT:
// - ALL getUserClient caches are invalidated
// - ALL users get fresh data on next request
// - Performance impact but data consistency ensured
```



#### Warning Signs You Need Cache Invalidation:
- ✅ Adding column to `client` table AND using it in getUserClient query
- ✅ Adding column to `admin_account` table AND using it in getUserClient query  
- ✅ Adding column to `county` table AND using it in getUserClient query
- ✅ Modifying `getUserClient` SELECT statement (adding/removing fields)
- ✅ Adding/removing JOINs in `getUserClient`
- ✅ Changing default values for columns SELECTED in getUserClient
- ✅ Dropping columns that ARE USED in getUserClient query
- ✅ Renaming columns that ARE USED in getUserClient query
- ❌ Adding columns to tables that are NOT used in getUserClient query

#### Cache Invalidation Checklist:
1. ✅ **Identify affected cache tags** (CacheTags::CLIENT for getUserClient)
2. ✅ **Check if columns are used in cached query** (getUserClient SELECT)
3. ✅ **Add cache clear in appropriate location** (migration, model, etc.)
4. ✅ **Test with cache enabled** to verify invalidation works
5. ✅ **Consider performance impact** (acceptable for data consistency)

#### Simple Decision Flow:
```
Making a database change?
├── Is the column/table used in getUserClient query?
│   ├── YES → Clear CacheTags::CLIENT cache ✅
│   └── NO → No cache invalidation needed ❌
└── Are you modifying getUserClient query itself?
    └── YES → Clear CacheTags::CLIENT cache ✅
```

### RBAC Pattern Integration in Models:
```php
// Permission-based data filtering
public function limitByPermissions($userId = null)
{
    if ($userId === null) {
        $userId = Yii::app()->user->id;
    }
    
    // Super Admin can see everything
    if (Yii::app()->user->checkAccess(UserRole::SUPER_ADMIN)) {
        return $this;
    }
    
    // Admin can see client data
    if (Yii::app()->user->checkAccess(UserRole::ADMIN)) {
        return $this->limitByClient($userId);
    }
    
    // Regular users see only their own data
    return $this->limitByUser($userId);
}
```

## NEVER DO
- Use raw SQL concatenation (always use parameter binding)
- Skip permission checks on sensitive operations
- Forget client_code filtering in multi-tenant queries
- Use dbWrite for read operations or dbRead for write operations
- Ignore error handling and logging
- Skip input validation and sanitization
- Use magic numbers instead of named constants
- Mix business logic in controllers (keep in models/services)
- Forget to handle AJAX-only actions with guardOnlyAjaxRequest()
- Skip transaction handling for multi-step operations
- Use manual JSON encoding or old renderJSON() methods (use JsonResponse component instead)
- Use direct echo/header calls for JSON responses (use JsonResponse component instead)
- Skip RBAC permission checks in controller actions
- Assign users directly to permissions (always use roles)
- Forget to invalidate role cache when adding permissions to roles
- Use inconsistent permission naming conventions
- Add permissions without updating Permission.php $list array  
- Add permissions without organizing them in PermissionGroup.php
- Skip constants for frequently used permissions in Permission.php
- Use inconsistent permission descriptions (follow "Module Name - Action" pattern)
- Modify columns USED in getUserClient query without clearing CacheTags::CLIENT cache
- Change getUserClient query structure without cache invalidation  
- Add columns to getUserClient SELECT without clearing cache tags
- Skip cache invalidation when modifying cached query dependencies

## ALWAYS DO
- Use parameter binding for all SQL queries
- Include proper error handling and logging
- Validate and sanitize all input data
- Check permissions before operations
- Use appropriate database connections (dbRead/dbWrite)
- Follow naming conventions consistently
- Include client_code filtering for multi-tenant data
- Use constants instead of magic strings/numbers
- Handle exceptions gracefully with user-friendly messages
- Use transactions for related database operations
- Implement proper accessRules() with RBAC checks
- Use UserRole constants for role checking
- Follow standard permission naming patterns (create/read/update/delete{ModuleName})
- Check permissions at controller level (accessRules() and action methods)
- Update Permission.php and PermissionGroup.php when adding new permissions (see sql-rules.mdc for migrations)
- Add permission constants in Permission.php for frequently used permissions
- Organize new permissions in appropriate sections in PermissionGroup.php
- Follow "Module Name - Action" description pattern consistently
- Test permission UI appearance after adding new permissions
- Clear CacheTags::CLIENT cache ONLY when modifying columns used in getUserClient query
- Add cache invalidation when adding new columns TO getUserClient SELECT statement
- Clear appropriate cache tags when changing cached query structure (getUserClient)
- Test cache behavior after query-affecting changes to ensure data consistency
- Include guardOnlyAjaxRequest() method implementation in controllers with AJAX actions
- Use JsonResponse component for all AJAX responses instead of manual JSON encoding
- Always call Yii::app()->end() after JsonResponse send()

## VARIABLE PATTERNS (REAL EXAMPLES)
```php
// ✅ CORRECT - camelCase variables
$clientCode = $this->getClientCode();
$userIds = Yii::app()->request->getQuery('user_ids', []);
$battDeptId = $this->getBattDeptId();
$qualifierIds = $params['qualifier_ids'] ?? [];
$startTime = $params['start_time'];
$endTime = $params['end_time'];
$isOffRoster = $params['is_off_roster'] ?? false;
$hasAccess = Yii::app()->user->checkAccess('createOffRoster');

// ❌ INCORRECT - snake_case variables
$client_code = $this->getClientCode();
$user_ids = Yii::app()->request->getQuery('user_ids', []);
$batt_dept_id = $this->getBattDeptId();
```