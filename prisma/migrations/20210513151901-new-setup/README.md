# Migration `20210513151901-new-setup`

This migration has been generated by JeevantheDev at 5/13/2021, 3:19:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

DROP INDEX "quaint"."Hospital.locationZipcode"

DROP INDEX "quaint"."Hospital.locationState"

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210513150211-new-db-initiate..20210513151901-new-setup
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -15,10 +15,10 @@
   locationType              String            
   locationCoordinates       String           
   locationFormattedAddress  String
   locationCity              String            
-  locationState             String  @unique          
-  locationZipcode           String  @unique          
+  locationState             String            
+  locationZipcode           String            
   locationCountryCode       String            
   hospitalType              String            
   hospitalEmail             String   @unique 
   hospitalContactNo         String               
```

