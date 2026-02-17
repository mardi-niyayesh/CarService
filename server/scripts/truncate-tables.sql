-- Delete all data in tables with TRUNCATE

SET SESSION_REPLICATION_ROLE = replica;

TRUNCATE TABLE
    users,
    refresh_tokens,
    roles,
    permissions,
    role_permission,
    user_roles
    CASCADE;

SET SESSION_REPLICATION_ROLE = origin;