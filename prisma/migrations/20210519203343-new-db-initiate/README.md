# Migration `20210519203343-new-db-initiate`

This migration has been generated by JeevantheDev at 5/19/2021, 8:33:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `lslvg006mM`.`Hospital` (
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`hospitalContactNo` varchar(191) NOT NULL  ,`hospitalEmail` varchar(191) NOT NULL  ,`hospitalImage` varchar(191)   ,`hospitalType` varchar(191) NOT NULL  ,`id` int NOT NULL  AUTO_INCREMENT,`locationCity` varchar(191) NOT NULL  ,`locationCoordinates` varchar(191) NOT NULL  ,`locationCountryCode` varchar(191) NOT NULL  ,`locationFormattedAddress` varchar(191) NOT NULL  ,`locationState` varchar(191) NOT NULL  ,`locationType` varchar(191) NOT NULL  ,`locationZipcode` varchar(191) NOT NULL  ,`nameHospital` varchar(191) NOT NULL  ,`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`userId` int  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `lslvg006mM`.`HospitalBeds` (
`currentBeds` int NOT NULL  ,`hospitalId` int  ,`id` int NOT NULL  AUTO_INCREMENT,`totalBeds` int NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `lslvg006mM`.`Account` (
`accessToken` varchar(191)   ,`accessTokenExpires` datetime(3)   ,`compound_id` varchar(191) NOT NULL  ,`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`id` int NOT NULL  AUTO_INCREMENT,`providerAccountId` varchar(191) NOT NULL  ,`providerId` varchar(191) NOT NULL  ,`providerType` varchar(191) NOT NULL  ,`refreshToken` varchar(191)   ,`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`userId` int NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `lslvg006mM`.`Session` (
`accessToken` varchar(191) NOT NULL  ,`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`expires` datetime(3) NOT NULL  ,`id` int NOT NULL  AUTO_INCREMENT,`sessionToken` varchar(191) NOT NULL  ,`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`userId` int NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `lslvg006mM`.`User` (
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`email` varchar(191)   ,`emailVerified` datetime(3)   ,`id` int NOT NULL  AUTO_INCREMENT,`image` varchar(191)   ,`name` varchar(191)   ,`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `Hospital.hospitalEmail` ON `lslvg006mM`.`Hospital`(`hospitalEmail`)

CREATE UNIQUE INDEX `Account.compound_id` ON `lslvg006mM`.`Account`(`compound_id`)

CREATE  INDEX `providerAccountId` ON `lslvg006mM`.`Account`(`providerAccountId`)

CREATE  INDEX `providerId` ON `lslvg006mM`.`Account`(`providerId`)

CREATE  INDEX `userId` ON `lslvg006mM`.`Account`(`userId`)

CREATE UNIQUE INDEX `Session.sessionToken` ON `lslvg006mM`.`Session`(`sessionToken`)

CREATE UNIQUE INDEX `Session.accessToken` ON `lslvg006mM`.`Session`(`accessToken`)

CREATE UNIQUE INDEX `User.email` ON `lslvg006mM`.`User`(`email`)

ALTER TABLE `lslvg006mM`.`Hospital` ADD FOREIGN KEY (`userId`) REFERENCES `lslvg006mM`.`User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `lslvg006mM`.`HospitalBeds` ADD FOREIGN KEY (`hospitalId`) REFERENCES `lslvg006mM`.`Hospital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210519203343-new-db-initiate
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,74 @@
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Hospital {
+  id                        Int               @default(autoincrement()) @id
+  user                      User?             @relation(fields: [userId], references: [id])
+  userId                    Int?              
+  nameHospital              String            
+  locationType              String            
+  locationCoordinates       String           
+  locationFormattedAddress  String
+  locationCity              String            
+  locationState             String            
+  locationZipcode           String            
+  locationCountryCode       String            
+  hospitalType              String            
+  hospitalEmail             String   @unique 
+  hospitalContactNo         String               
+  hospitalImage             String?           
+  createdAt                 DateTime          @default(now())
+  updatedAt                 DateTime          @default(now())
+}
+
+model HospitalBeds {
+  id                        Int               @default(autoincrement()) @id
+  hospital                  Hospital?         @relation(fields: [hospitalId], references: [id])
+  hospitalId                Int?             
+  totalBeds                 Int          
+  currentBeds               Int          
+}
+
+model Account {
+  id                 Int       @default(autoincrement()) @id
+  compoundId         String    @unique @map(name: "compound_id")
+  userId             Int       
+  providerType       String    
+  providerId         String   
+  providerAccountId  String    
+  refreshToken       String?   
+  accessToken        String?   
+  accessTokenExpires DateTime? 
+  createdAt          DateTime  @default(now()) 
+  updatedAt          DateTime  @default(now()) 
+
+  @@index([providerAccountId], name: "providerAccountId")
+  @@index([providerId], name: "providerId")
+  @@index([userId], name: "userId")
+}
+
+model Session {
+  id           Int      @default(autoincrement()) @id
+  userId       Int      
+  expires      DateTime
+  sessionToken String   @unique 
+  accessToken  String   @unique 
+  createdAt    DateTime @default(now())
+  updatedAt    DateTime @default(now())
+}
+
+model User {
+  id            Int       @default(autoincrement()) @id
+  name          String?
+  email         String?   @unique
+  emailVerified DateTime? 
+  image         String?
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @default(now())
+}
```

