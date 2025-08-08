# First Due SQL Development Rules
# This file ensures AI follows our established patterns for all SQL suggestions

## CORE PRINCIPLES
- We are developing a fire department management system (First Due)
- Our database is PostgreSQL with multi-tenant architecture using client_code
- All suggestions must follow our established patterns from 6000+ existing migrations

## DATABASE STRUCTURE REFERENCE (CRITICAL)
- **ALWAYS check** `/docs/db/fdsu-schema.sql` for actual table names and structure
- **ALWAYS check** `/docs/db/fdsu.pdm` for entity relationships and constraints
- **Users table**: `admin_account` (NOT `users` or `user`)
- **Common tables**: Use actual table names from schema, not assumptions
- **Foreign keys**: Reference actual existing tables and columns
- When in doubt about table structure, search the schema files first

## CRITICAL SYSTEM TABLES (EXTREME CAUTION REQUIRED)

### Core Tables Requiring Extra Vigilance:
These tables are the backbone of the First Due system and modifications can have widespread impact:

- **`client`** - Multi-tenant client configuration, affects ALL system features
- **`admin_account`** - User authentication and authorization, system-wide user data
- **`dispatch`** - Emergency dispatch data, core to emergency response workflow
- **`place`** - Location/address data, referenced throughout the system
- **`incident_report`** - Core incident documentation, heavily integrated
- **`nfirs_basic`** - National Fire Incident Reporting System data, regulatory compliance
- **`preplan`** - Pre-incident planning data, critical for emergency response

### MANDATORY Precautions for Critical Tables:

#### 1. **Required Migration Comments** (MANDATORY):
```php
class m{YYMMDD}_{HHMMSS}_{description} extends CDbMigration
{
    public function safeUp()
    {
        // ⚠️  CRITICAL TABLE MODIFICATION ⚠️
        // Table: {critical_table_name}
        // Impact: Describe the expected system-wide impact
        // Dependencies: List dependent systems/features
        // Cache Impact: Note any cache invalidation requirements
        
        $this->execute('...');
        
        // CRITICAL: Always invalidate cache for critical table changes
        (new CacheDbSchema)->invalidate(['{table_name}']);
    }
}
```

#### 2. **Cache Dependencies for Critical Tables**:
```php
// Critical tables with widespread cache impact:
// - client: Affects CacheTags::CLIENT (getUserClient cache)
// - admin_account: Affects CacheTags::CLIENT, user session cache
// - dispatch: Affects dispatch parsing, CAD integration cache
// - place: Affects address lookup, mapping cache
// - incident_report: Affects reporting cache, NFIRS export cache
// - nfirs_basic: Affects regulatory reporting cache
// - preplan: Affects emergency response cache, mapping cache
```

### Critical Table Modification Checklist:
1. ✅ **Add CRITICAL TABLE warning comment** in migration
2. ✅ **Document expected system impact** in migration comments
3. ✅ **List all dependent features** that could be affected
4. ✅ **Include cache invalidation** if applicable
5. ✅ **Coordinate with team** before making changes
6. ✅ **Have rollback plan** ready if issues arise

### Example Critical Table Migration:
```php
class m240115_143000_add_new_feature_to_client extends CDbMigration
{
    public function safeUp()
    {
        // ⚠️  CRITICAL TABLE MODIFICATION ⚠️
        // Table: client
        // Impact: Affects all client configurations system-wide
        // Dependencies: All modules that check client settings
        // Cache Impact: Invalidates CacheTags::CLIENT (affects getUserClient)
        
        $this->execute('ALTER TABLE client ADD COLUMN new_feature_enabled bool DEFAULT false;');
        
        // CRITICAL: Cache invalidation required for client table changes
        Yii::app()->cacheWrite->clear(CacheTags::CLIENT);
    }
}
```

### Emergency Response for Critical Table Issues:
- **Rollback Plan**: Have tested rollback migration ready
- **Communication**: Alert team immediately of any issues
- **Monitoring**: Watch for unexpected system behavior

## SQL CODE STYLE (MANDATORY)
- 4 spaces indentation, NO tabs
- 80 character line limit
- Capitalize ALL SQL keywords: SELECT, FROM, WHERE, INSERT, CREATE, ALTER, etc.
- Lowercase function names: count(), max(), sum(), concat_ws(), coalesce(), row_number(), nullif()
- Underscore_separated naming: date_of_birth, client_code, created_at
- Singular table names: address (not addresses), event (not events)
- All identifiers ≤ 63 characters (PostgreSQL limit)

## MIGRATION STRUCTURE (REQUIRED PATTERN)
```php
class m{YYMMDD}_{HHMMSS}_{description} extends CDbMigration
{
    public function safeUp()
    {
        // Your SQL operations here
    }
    
    public function safeDown()
    {
        echo "Migration does not support migration down.\n";
        return false;
    }
}
```

## BATCH PROCESSING PATTERN (ONLY for large data operations)
Use ONLY when processing large amounts of data (updates, inserts, deletes on existing tables with substantial data):
```php
class m{YYMMDD}_{HHMMSS}_{description} extends CDbMigration
{
    public const BATCH_SIZE = 100;  // Adjust based on data volume (100-5000)
    public const STATEMENT_TIMEOUT = 120000;  // For complex operations (milliseconds)
    
    public function up()  // Use up() instead of safeUp() for complex logic
    {
        $timeout = self::STATEMENT_TIMEOUT;
        $sql = "SET statement_timeout TO {$timeout};";
        Yii::app()->db->createCommand($sql)->execute();
        
        // Batch processing for large datasets
        do {
            $rowsUpdated = $this->dbConnection->createCommand('
                WITH updated_rows AS (
                    SELECT id FROM table_name 
                    WHERE condition 
                    LIMIT 1000
                )
                UPDATE table_name SET ... FROM updated_rows
            ')->execute();
            echo "{$rowsUpdated} rows updated\n";
        } while ($rowsUpdated > 0);
        
        // OR for batch inserts with raw SQL
        $batches = array_chunk($dataArray, self::BATCH_SIZE);
        foreach ($batches as $batch) {
            $values = [];
            foreach ($batch as $row) {
                $values[] = "('" . implode("', '", array_map('addslashes', $row)) . "')";
            }
            $sql = 'INSERT INTO table_name (column1, column2) VALUES ' . implode(', ', $values);
            $this->execute($sql);
            echo "table_name, " . count($batch) . " rows inserted\n";
        }
    }
}
```

## TABLE CREATION PATTERN (STANDARD TEMPLATE)
```sql
CREATE TABLE table_name (
    id integer GENERATED ALWAYS AS IDENTITY,
    client_code varchar(28) NOT NULL,
    name varchar(255) NOT NULL,
    is_active bool NOT NULL DEFAULT false,
    created_by integer,  -- References admin_account.id (our users table)
    created_at timestamp NOT NULL DEFAULT LOCALTIMESTAMP,
    updated_by integer,  -- References admin_account.id (our users table)
    updated_at timestamp,
    CONSTRAINT pk_table_name PRIMARY KEY (id)
);

-- Add foreign key constraints for audit fields
ALTER TABLE table_name
    ADD CONSTRAINT fk_table_name_ref_admin_account_created_by
        FOREIGN KEY (created_by)
            REFERENCES admin_account (id)
            ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE table_name
    ADD CONSTRAINT fk_table_name_ref_admin_account_updated_by
        FOREIGN KEY (updated_by)
            REFERENCES admin_account (id)
            ON UPDATE CASCADE ON DELETE SET NULL;
```

## NAMING CONVENTIONS (STRICT RULES)
- Tables: singular nouns (address, personnel, event)
- Indexes: {table}_{column}_idx (address_id_idx)
- Unique indexes: {table}_{column}_uq_idx (address_parcelkey_uq_idx)
- Primary keys: pk_{table} (pk_address)
- Foreign keys: fk_{main_table}_ref_{referenced_table}

## FOREIGN KEY PATTERN (MANDATORY FORMAT)
```sql
ALTER TABLE table_name
    ADD CONSTRAINT fk_table_name_ref_referenced_table
        FOREIGN KEY (column_name)
            REFERENCES referenced_table (id)
            ON UPDATE CASCADE ON DELETE SET NULL;
```

## CACHE INVALIDATION RULES (CRITICAL)
- ONLY use cache invalidation for CHANGES to existing tables
- DO NOT use cache invalidation for NEW table creation
- Use when: ALTER TABLE, UPDATE data, CREATE INDEX on existing tables
- Pattern: (new CacheDbSchema)->invalidate(['table_names']);

Examples:
```php
// ✅ CORRECT - Modifying existing table
$this->execute('ALTER TABLE existing_table ADD COLUMN new_column varchar(255);');
(new CacheDbSchema)->invalidate(['existing_table']);

// ❌ INCORRECT - Creating new table
$this->execute('CREATE TABLE new_table (...);');
// NO cache invalidation needed

// ✅ CORRECT - Adding index to existing table
$this->execute('CREATE INDEX existing_table_column_idx ON existing_table (column);');
(new CacheDbSchema)->invalidate(['existing_table']);
```

## APPLICATION QUERY PATTERNS (CRITICAL for Model Development)

### YII QUERY EXECUTION PATTERNS:
```php
// Read queries - Use dbRead connection
$result = Yii::app()
    ->dbRead
    ->createCommand($sql)
    ->bindValues($params)
    ->setFetchMode(PDO::FETCH_OBJ)
    ->queryAll();

// Write queries - Use dbWrite connection  
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

### PARAMETER BINDING (MANDATORY):
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

### COMPLEX CASE STATEMENTS (Real-world pattern):
```sql
SELECT
    t.id,
    CASE
        WHEN t.status = 'active' AND t.is_deleted = false THEN 'Active'
        WHEN t.status = 'pending' AND t.created_at > CURRENT_DATE - INTERVAL '7 days' THEN 'Recent'
        WHEN t.status IS NULL OR t.status = '' THEN 'No Status'
        ELSE 'Other'
    END AS status_description,
    CASE
        WHEN coalesce(trim(t.first_name), '') != '' 
            AND coalesce(trim(t.last_name), '') != ''
            THEN concat(t.first_name, ' ', t.last_name)
        ELSE t.public_name
    END AS display_name
FROM
    table_name t;
```

### NULL HANDLING AND STRING OPERATIONS:
```sql
-- Safe string concatenation
SELECT
    concat_ws(' ', t.first_name, t.middle_name, t.last_name) AS full_name,
    coalesce(t.preferred_name, t.first_name, 'Unknown') AS display_name,
    CASE
        WHEN coalesce(trim(t.phone), '') != '' THEN t.phone
        ELSE 'No phone'
    END AS contact_phone
FROM
    table_name t;

-- Field not empty condition pattern
WHERE coalesce(trim(t.field_name), '') != ''
```

### DYNAMIC QUERY BUILDING PATTERNS:
```php
// Build WHERE conditions dynamically
$conditions = [];
$params = [':client_code' => $clientCode];

if (!empty($statusCode)) {
    $conditions[] = 't.status_code = :status_code';
    $params[':status_code'] = $statusCode;
}

if (!empty($userIds)) {
    $placeholders = [];
    foreach ($userIds as $i => $userId) {
        $placeholders[] = ":user_id_{$i}";
        $params[":user_id_{$i}"] = $userId;
    }
    $conditions[] = 't.user_id IN (' . implode(',', $placeholders) . ')';
}

$whereClause = !empty($conditions) ? 'WHERE ' . implode(' AND ', $conditions) : '';
$sql = "SELECT t.id, t.name, t.status FROM table_name t {$whereClause}";
```

## ADVANCED SQL PATTERNS

### Window Functions (for ranking and partitioning):
```sql
SELECT
    t.id,
    t.name,
    row_number() OVER (PARTITION BY t.group_id ORDER BY t.created_at DESC) AS rn,
    LAG(t.status) OVER (PARTITION BY t.group_id ORDER BY t.id) AS prev_status
FROM
    table_name t
WHERE
    t.client_code = :client_code;
```

### Common Table Expressions (CTEs):
```sql
WITH filtered_data AS (
    SELECT
        t.id, t.name, t.status
    FROM
        table_name t
    WHERE
        t.client_code = :client_code
        AND t.is_active = true
),
aggregated_data AS (
    SELECT
        fd.status,
        count(*) AS status_count
    FROM
        filtered_data fd
    GROUP BY
        fd.status
)
SELECT status, status_count FROM aggregated_data;
```

### CASE Statement Formatting:
```sql
SELECT
    t.id,
    CASE
        WHEN t.status = 'active' THEN 'Active Status'
        WHEN t.status = 'pending' THEN 'Pending Review'
        WHEN t.status IS NULL THEN 'No Status'
        ELSE 'Unknown Status'
    END AS status_description
FROM
    table_name t;
```

### PostgreSQL String Functions:
```sql
-- Use concat_ws for safe concatenation with separators
SELECT
    concat_ws(', ', t.address1, t.city, t.state_code) AS full_address,
    concat_ws(' ', t.first_name, t.middle_name, t.last_name) AS full_name
FROM
    table_name t;

-- Use coalesce for NULL handling
SELECT
    coalesce(t.preferred_name, t.first_name, 'Unknown') AS display_name,
    coalesce(t.mobile_phone, t.work_phone, t.home_phone) AS contact_phone
FROM
    table_name t;
```

### TEMPORARY TABLE Pattern (for complex operations):
```sql
CREATE TEMPORARY TABLE temp_table_name AS (
    SELECT
        t.id,
        t.status,
        row_number() OVER (PARTITION BY t.group_id ORDER BY t.created_at DESC) AS rn
    FROM
        table_name t
    WHERE
        t.client_code = :client_code
);
```

### VALUES Clause for Multi-row Operations:
```sql
-- For batch updates with known values
UPDATE table_name
SET column1 = v.new_value
FROM (
    VALUES
        (1, 'value1'),
        (2, 'value2'),
        (3, 'value3')
) AS v(id, new_value)
WHERE table_name.id = v.id;

-- For batch inserts
INSERT INTO table_name (name, type) VALUES
    ('name1', 'type1'),
    ('name2', 'type2'),
    ('name3', 'type3');
```

### UPDATE with FROM Pattern:
```sql
UPDATE target_table t
SET column1 = s.value1,
    column2 = s.value2,
    updated_at = LOCALTIMESTAMP
FROM source_table s
WHERE t.id = s.target_id
    AND t.client_code = :client_code;
```

### Conditional Column Addition:
```sql
-- Use IF NOT EXISTS for safe schema changes
ALTER TABLE table_name 
    ADD COLUMN IF NOT EXISTS new_column varchar(255);

CREATE INDEX IF NOT EXISTS table_name_new_column_idx 
    ON table_name (new_column);
```

## COLUMN MODIFICATION PATTERNS (CRITICAL)

### When to Use Create-Migrate-Rename Pattern:
Use the **create new column** approach instead of direct `ALTER COLUMN` when:
- **Changing column data type** (especially when data transformation is complex)
- **Renaming columns with type changes** 
- **Working with large datasets** (millions of rows)
- **Need safer rollback options**
- **Complex data transformations** required during migration

### Simple Column Rename (for basic renames without type changes):
```php
// ✅ Simple rename when no type change needed
$this->execute('
    ALTER TABLE table_name 
        RENAME COLUMN old_column_name TO new_column_name;
');
```

### Create-Migrate-Rename Pattern (PREFERRED for type changes):
```php
class m{YYMMDD}_{HHMMSS}_{description} extends CDbMigration
{
    public function safeUp()
    {
        // Step 1: Add new column with new data type
        $this->execute('
            ALTER TABLE table_name
                ADD COLUMN column_name_new new_data_type;
        ');

        // Step 2: Migrate data from old to new column
        $this->execute('
            UPDATE table_name
            SET column_name_new = CAST(old_column_name AS new_data_type)
            WHERE old_column_name IS NOT NULL;
        ');

        // Step 3: Rename old column for safety (keep for rollback)
        $this->execute('
            ALTER TABLE table_name
                RENAME COLUMN old_column_name TO old_column_name_backup;
        ');

        // Step 4: Rename new column to original name
        $this->execute('
            ALTER TABLE table_name
                RENAME COLUMN column_name_new TO old_column_name;
        ');

        // Step 5: Recreate indexes/constraints if needed
        $this->execute('
            CREATE INDEX table_name_column_name_idx 
                ON table_name (old_column_name);
        ');

        // NOTE: Keep old_column_name_backup for a period (weeks/months)
        // Drop in separate migration after confirming everything works
        echo "WARNING: old_column_name_backup column kept for safety - drop in future migration\n";

        // CRITICAL: Cache invalidation for existing table changes
        (new CacheDbSchema)->invalidate(['table_name']);
    }
}
```

### Batch Processing for Large Tables:
```php
// Step 2 alternative: Batch migration for large datasets
$batchSize = 2000;
$offset = 0;

do {
    $rowsUpdated = $this->getDbConnection()->createCommand("
        WITH batch_cte AS (
            SELECT id
            FROM table_name
            WHERE column_name_new IS NULL
                AND old_column_name IS NOT NULL
            ORDER BY id
            LIMIT {$batchSize} OFFSET {$offset}
        )
        UPDATE table_name
        SET column_name_new = CAST(old_column_name AS new_data_type)
        WHERE id IN (SELECT id FROM batch_cte)
    ")->execute();

    echo "{$rowsUpdated} rows updated\n";
    $offset += $batchSize;
} while ($rowsUpdated > 0);
```

### Complex Data Transformation Example:
```php
// Real example: Converting string to JSONB with custom logic
$this->execute('
    ALTER TABLE table_name 
        ADD COLUMN status_codes_new jsonb;
');

$this->execute("
    UPDATE table_name
    SET status_codes_new =
        CASE 
            WHEN old_status_code = 'multiple_values'
                THEN jsonb_build_array('status1', 'status2')
            WHEN old_status_code = 'not_available'
                THEN '[]'::jsonb
            ELSE jsonb_build_array(old_status_code)
        END
    WHERE old_status_code IS NOT NULL
");

$this->execute('
    ALTER TABLE table_name 
        RENAME COLUMN old_status_code TO old_status_code_backup;
');

$this->execute('
    ALTER TABLE table_name 
        RENAME COLUMN status_codes_new TO status_codes;
');

echo "WARNING: old_status_code_backup column kept for safety - drop in future migration\n";
```

### Cleanup Migration Pattern (after safety period):
```php
// Separate migration to drop backup columns after weeks/months
class m{YYMMDD}_{HHMMSS}_cleanup_old_backup_columns extends CDbMigration
{
    public function safeUp()
    {
        // Only drop after confirming new column works properly
        $this->execute('
            ALTER TABLE table_name 
                DROP COLUMN IF EXISTS old_column_name_backup;
        ');
        
        echo "Dropped backup column old_column_name_backup\n";
        
        // CRITICAL: Cache invalidation for column removal
        (new CacheDbSchema)->invalidate(['table_name']);
    }
}
```

### Column Modification Checklist:
1. ✅ **Determine if simple rename or type change** is needed
2. ✅ **Use direct RENAME for simple renames** without type changes
3. ✅ **Use create-migrate-rename for type changes** or complex transformations
4. ✅ **Keep backup column** for safety period (weeks/months)
5. ✅ **Consider batch processing** for large tables (>100K rows)
6. ✅ **Plan data transformation logic** before writing migration
7. ✅ **Recreate indexes and constraints** after column replacement
8. ✅ **Include cache invalidation** for modified tables
9. ✅ **Test with production-like data volume** before deployment
10. ✅ **Schedule cleanup migration** to drop backup columns later
11. ✅ **Have rollback plan** ready for complex migrations

### Real Migration Examples Reference:
- **m241212_133819_change_iaff_number_type.php**: int to varchar conversion
- **m280524_185532_convert_cc_available_type_code_to_jsonb.php**: string to jsonb with complex logic
- **m220428_091013_change_county_code_type.php**: batch processing for large tables

## QUERY STRUCTURE (MANDATORY STYLE)
```sql
SELECT
    t.column1,
    t.column2,
    count(r.id) AS record_count
FROM
    table_name t
        INNER JOIN related_table r ON (t.id = r.table_id)
WHERE
    t.client_code = :client_code
    AND t.is_active = true
    AND t.created_at >= :start_date
GROUP BY
    t.column1, t.column2
ORDER BY
    t.column1;
```

## COMMON PATTERNS TO FOLLOW
- Multi-tenancy: Always include client_code filtering
- Audit fields: created_by, created_at, updated_by, updated_at
- Soft deletes: Use is_active/is_deleted flags, not actual DELETE
- Duplicate removal: Use window functions (LAG, LEAD) with TEMPORARY tables
- Function creation: Use CREATE OR REPLACE FUNCTION with LANGUAGE plpgsql
- NULL handling: Use coalesce() and nullif() appropriately
- String concatenation: Always use concat_ws() for safe concatenation
- Subqueries: Use CTEs instead of nested subqueries for readability
- Parameter binding: ALWAYS use :parameter_name syntax, never concatenate

## MIGRATION TYPES AND WHEN TO USE WHAT:

### Simple Table Creation (safeUp, no cache invalidation):
```php
public function safeUp()
{
    $this->execute('CREATE TABLE...');
    $this->execute('ALTER TABLE... ADD CONSTRAINT...');
    $this->execute('CREATE INDEX...');
    // NO cache invalidation for new tables
}
```

### Table Modifications (safeUp, WITH cache invalidation):
```php
public function safeUp()
{
    $this->execute('ALTER TABLE existing_table ADD COLUMN...');
    (new CacheDbSchema)->invalidate(['existing_table']);
}
```

### Large Data Operations (up, WITH batch processing):
```php
public const BATCH_SIZE = 100;
public const STATEMENT_TIMEOUT = 120000;

public function up()
{
    // Set timeout for large operations
    // Use do-while loops for batch processing
    // Include progress logging
}
```

## DATABASE FUNCTIONS (WHEN CREATING)
```sql
CREATE OR REPLACE FUNCTION function_name(param_type)
RETURNS return_type
LANGUAGE plpgsql VOLATILE  -- or STABLE/IMMUTABLE based on usage
AS $$
BEGIN
    -- Function body
    RETURN result;
END;
$$;
```

## PERFORMANCE PATTERNS
- Use LIMIT for queries that might return large datasets
- Add appropriate indexes for WHERE, ORDER BY, and JOIN conditions
- Use EXPLAIN ANALYZE for complex queries during development
- Prefer EXISTS over IN for subqueries
- Use appropriate connection (dbRead for reads, dbWrite for writes)

## NEVER DO
- Use camelCase in SQL (use underscore_case)
- Add cache invalidation for new table creation
- Use batch processing for simple schema changes
- Create migrations that support rollback unless specifically needed
- Use FROM-joins (always explicit INNER/LEFT JOIN)
- Forget cache invalidation when modifying existing tables
- Use DISTINCT without ON clause (use DISTINCT ON (columns))
- Use raw string concatenation (use concat_ws instead)
- Forget to handle NULL values in calculations (use coalesce)
- Concatenate user input directly into SQL (always use parameters)
- Use dbWrite for read operations or dbRead for write operations

## WHEN TO USE EACH PATTERN:

### New Table Creation:
- Use `safeUp()` method
- NO cache invalidation
- NO batch processing
- NO statement timeout

### Existing Table Modifications:
- Use `safeUp()` method  
- WITH cache invalidation
- NO batch processing (unless data changes)
- NO statement timeout (unless large data)

### Large Data Operations:
- Use `up()` method
- WITH batch processing (BATCH_SIZE constant)
- WITH statement timeout (STATEMENT_TIMEOUT constant)
- WITH progress logging
- WITH cache invalidation (if schema changes)

### Complex Data Analysis:
- Use CTEs for multi-step logic
- Use window functions for ranking/partitioning
- Use TEMPORARY tables for intermediate processing
- Use CASE statements for conditional logic
- Use LATERAL joins for correlated subqueries

### Application Queries:
- Always use createCommand() with parameter binding
- Use appropriate database connection (dbRead/dbWrite)
- Handle NULL values with coalesce
- Build dynamic queries safely with parameter arrays
- Use client_code filtering for multi-tenancy

Remember: Cache invalidation is ONLY for changes to existing tables, not new table creation!

## YII RBAC (ROLE-BASED ACCESS CONTROL) PATTERNS (CRITICAL)

### Core RBAC Tables:
- **auth_item**: Stores both permissions (type=1) and roles (type=2)
- **auth_assignment**: Links users to roles (userid references admin_account.id)
- **auth_item_child**: Many-to-many relationship between roles and permissions

### Permission Types:
- **CAuthItem::TYPE_TASK** (1): Individual permissions
- **CAuthItem::TYPE_ROLE** (2): Roles that contain multiple permissions

### Standard Role Hierarchy:
```php
// System roles from UserRole class
UserRole::SUPER_ADMIN = 'Super Admin';
UserRole::ADMIN = 'Admin';
UserRole::FIRST_DUE_INTERNAL = 'First Due Internal';
UserRole::FIRE_DEPT_ADMIN = 'Fire Department Admin';
UserRole::FIRE_DEPT_USER = 'Fire Department';
UserRole::PERSONNEL = 'Personnel';
UserRole::CC_USER = 'CommunityUser';
```

### Permission Naming Conventions (MANDATORY):
```php
// CRUD operations
'create{ModuleName}'     // Create permission
'read{ModuleName}'       // Read/view permission  
'update{ModuleName}'     // Update/edit permission
'delete{ModuleName}'     // Delete permission

// Specialized operations
'export{ModuleName}'     // Export data
'complete{ModuleName}'   // Mark as complete
'authorize{ModuleName}'  // Authorize/approve
'manage{ModuleName}Setup' // Manage module settings

// Saved view permissions
'read{ModuleName}SavedView'
'create{ModuleName}SavedView'
'update{ModuleName}SavedView'
'delete{ModuleName}SavedView'
```

### Single Permission Migration Pattern:
```php
class m{YYMMDD}_{HHMMSS}_{description} extends CDbMigration
{
    public function safeUp()
    {
        // Create permission
        $this->execute("
            INSERT INTO auth_item (name, type, description, data) VALUES (
                'permissionName', 1, 'Human Readable Description', 'N;');
        ");

        // Assign to standard roles
        $this->execute("
            INSERT INTO auth_item_child (parent, child) VALUES (
                'Admin', 'permissionName');
        ");

        $this->execute("
            INSERT INTO auth_item_child (parent, child) VALUES (
                'Super Admin', 'permissionName');
        ");

        // CRITICAL: Role cache invalidation for permission changes
        (new RoleForm)->invalidateCache('Admin');
        (new RoleForm)->invalidateCache('Super Admin');
    }
}
```

### Multiple Permissions Migration Pattern (PREFERRED):
```php
class m{YYMMDD}_{HHMMSS}_{description} extends CDbMigration
{
    public function safeUp()
    {
        $permissions = [
            [
                'name' => 'create{ModuleName}',
                'type' => CAuthItem::TYPE_TASK,
                'description' => '{Module Name} - Create',
                'data' => 'N;',
            ],
            [
                'name' => 'read{ModuleName}',
                'type' => CAuthItem::TYPE_TASK,
                'description' => '{Module Name} - Read',
                'data' => 'N;',
            ],
            [
                'name' => 'update{ModuleName}',
                'type' => CAuthItem::TYPE_TASK,
                'description' => '{Module Name} - Update',
                'data' => 'N;',
            ],
            [
                'name' => 'delete{ModuleName}',
                'type' => CAuthItem::TYPE_TASK,
                'description' => '{Module Name} - Delete',
                'data' => 'N;',
            ],
        ];

        // Bulk insert permissions with raw SQL
        $permissionValues = [];
        foreach ($permissions as $permission) {
            $permissionValues[] = "('{$permission['name']}', {$permission['type']}, '{$permission['description']}', '{$permission['data']}')";
        }
        $this->execute("
            INSERT INTO auth_item (name, type, description, data) VALUES 
            " . implode(', ', $permissionValues) . ";
        ");
        
        // Assign to standard roles with raw SQL
        $roles = [UserRole::SUPER_ADMIN, UserRole::ADMIN];
        $assignmentValues = [];
        foreach ($permissions as $permission) {
            foreach ($roles as $role) {
                $assignmentValues[] = "('{$role}', '{$permission['name']}')";
            }
        }
        $this->execute("
            INSERT INTO auth_item_child (parent, child) VALUES 
            " . implode(', ', $assignmentValues) . ";
        ");

        // CRITICAL: Role cache invalidation for permission changes
        foreach ($roles as $role) {
            (new RoleForm)->invalidateCache($role);
        }
    }
}
```

### Complex Permission Assignment Pattern:
```php
// Copy permissions from existing permission to new ones
$this->execute("
    INSERT INTO auth_item_child (parent, child)
    SELECT
        t.parent, q.child
    FROM
        auth_item_child t,
        (VALUES ('newPermission1'),
                ('newPermission2')) AS q (child)
    WHERE
        t.child = 'existingPermission'
        AND t.parent NOT IN ('Admin', 'Super Admin')
");

// Remove obsolete permission
$this->execute("
    DELETE FROM auth_item WHERE name = 'obsoletePermission';
");
```

### Saved View Permissions Pattern:
```php
$savedViewPermissions = [
    [
        'name' => 'read{ModuleName}SavedView',
        'type' => CAuthItem::TYPE_TASK,
        'description' => '{Module Name} - Read Saved View',
        'data' => 'N;',
    ],
    [
        'name' => 'create{ModuleName}SavedView',
        'type' => CAuthItem::TYPE_TASK,
        'description' => '{Module Name} - Create Saved View',
        'data' => 'N;',
    ],
    [
        'name' => 'update{ModuleName}SavedView',
        'type' => CAuthItem::TYPE_TASK,
        'description' => '{Module Name} - Update Saved View',
        'data' => 'N;',
    ],
    [
        'name' => 'delete{ModuleName}SavedView',
        'type' => CAuthItem::TYPE_TASK,
        'description' => '{Module Name} - Delete Saved View',
        'data' => 'N;',
    ],
];
```

### Cache Invalidation Rules for RBAC (CRITICAL):
1. **ONLY invalidate role cache for permission changes**: `(new RoleForm)->invalidateCache($roleName);`
2. **Apply to all affected roles**: Super Admin, Admin, and any custom roles
3. **NO schema cache invalidation needed**: Adding permissions is data change, not structure change



### RBAC Migration Checklist:
1. ✅ **Define permissions array** with name, type, description, data
2. ✅ **Use CAuthItem::TYPE_TASK** for permissions  
3. ✅ **Use bulk insert** with raw SQL for multiple permissions
4. ✅ **Assign to standard roles** (Super Admin, Admin at minimum)
5. ✅ **Copy from existing permissions** if replacing functionality
6. ✅ **Delete obsolete permissions** if replacing
7. ✅ **Invalidate role cache** for all affected roles (ONLY role cache, not schema cache)
8. ✅ **Follow naming conventions** (create/read/update/delete{ModuleName})
9. ✅ **Add saved view permissions** if module has list functionality

### Common RBAC Patterns:

#### Standard Module Permissions:
```php
$permissions = [
    ['name' => 'create{ModuleName}', 'description' => '{Module Name} - Create'],
    ['name' => 'read{ModuleName}', 'description' => '{Module Name} - Read'], 
    ['name' => 'update{ModuleName}', 'description' => '{Module Name} - Update'],
    ['name' => 'delete{ModuleName}', 'description' => '{Module Name} - Delete'],
    ['name' => 'export{ModuleName}', 'description' => '{Module Name} - Export'],
];
```

#### Report Module Permissions:
```php
$permissions = [
    ['name' => 'read{ReportName}Report', 'description' => '{Report Name} Report - Read'],
    ['name' => 'export{ReportName}Report', 'description' => '{Report Name} Report - Export'],
];
```

#### Workflow Module Permissions:
```php
$permissions = [
    ['name' => 'create{ModuleName}', 'description' => '{Module Name} - Create'],
    ['name' => 'read{ModuleName}', 'description' => '{Module Name} - Read'],
    ['name' => 'update{ModuleName}', 'description' => '{Module Name} - Update'],
    ['name' => 'complete{ModuleName}', 'description' => '{Module Name} - Complete'],
    ['name' => 'authorize{ModuleName}', 'description' => '{Module Name} - Authorize'],
    ['name' => 'incomplete{ModuleName}', 'description' => '{Module Name} - Mark Incomplete'],
];
```