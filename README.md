# Introduction

CATcher is a desktop application for peer-testing of software projects.

Project structure adapted from, https://angular.io/guide/styleguide#overall-structural-guidelines and https://github.com/maximegris/angular-electron.

Currently runs with:

- Angular v7.2.10
- Electron v4.0.0
- Electron Builder v20.28.1

This application will support the following order of workflow:
1. **Bug Reporting**: Testers which have already been informed of the teams which they will be testing will be able to start creating new bug reports during this phase.
2. **Team's Response**: Teams would be able to respond to the bugs that are reported during the bug reporting phase.
3. **Evaluation**: Tutors and Admins will be able to view the bug reports and their respective team's response and evaluate them accordingly, changing the severity and status of the bug reports accordingly.

# Getting Started

1. Clone this repository locally.

2. Install dependencies with npm :

``` bash
npm install
```
## Set up Organization
A Github organization must be created first. The organization must have the following settings:
1. Set `Base Permissions` to `None`.
    1. Under `Settings` page of your organization, click on `Member privileges` navigation tab.
    2. Under `Base permissions`, select `None`.
2. Create `admins` team.
3. Create `students` team.
4. Create `tutors` team.
5. Invite github users into their respective teams. 


## Set up Github Repositories
This application assumes 4 repositories will be created under the above organization (the naming of repository must follow **exactly** as what is specified.

For each phase, users with write access will be able to upload files (e.g. screenshots, .txt files, etc...) onto the repository's `/file` folder. These files are used in conjuction with issue's description and comments in a form of a link. As for images, the actual image will be displayed.

### `public_data` Repository
This repository must contain 1 file called `data.json`. In this JSON file, it will contain the following information:
1. Roles of users. (Student, Tutor, Admin)
2. Team structure. For each team, the JSON must specify which student is in that team.
3. Student's team allocation. For each student, the JSON must specify which team the student is in.
4. Tutor's team allocation. For each tutor, the JSON must specify which team the tutor is responsible for.
5. Admin's team allocation. For each admin, the JSON must specify which team the admin is responsible for. (The application will still give admin full access to the repository.)

### `pe` Repository
This repository will be used for the **Bug Reporting** phase where students can report bugs of the team which they are testing.

All the bug reports that are created from the application will be posted into this repository.

This repository must include the following issue tags:
1. **Severity**: `severity.High`, `severity.Medium`, `severity.Low`
2. **Type**: `type.DocumentationBug`, `type.FunctionalityBug`

### `pe-results` Repository
This repository will be used for the **Team's Response** phase.

After the bug reporting phase, the issues posted during that phase will be transferred over to this repository, with the identity of the poster anonymized.

This repository will then be used by the application for individual teams to respond to the bugs that are discovered by the testers testing their application.

This repository must include the following issue tags:
1. **Severity**: `severity.High`, `severity.Medium`, `severity.Low`
2. **Type**: `type.DocumentationBug`, `type.FunctionalityBug`
3. **Response**: `response.Accepted`, `response.CannotReproduce`, `response.IssueUnclear`, `response.Rejected`
4. **Status**: `status.Done`, `status.Incomplete`
5. **Team**: `team.*`
6. **Tutorial**: `tutorial.*`
7. **Duplicate**: `duplicate`

### `pe-evaluation` Repository
This repository will be used for the **Evaluation** phase.

After the teams have responded to the bugs reported by their testers. The issues and their respective responses from `pe-results` will be transferred over to this repository. 

The application will then use this repository to post tutor's or admin's evaluation of each team's response and their respective bug report.

This repository must include the following issue tags:
1. **Severity**: `severity.High`, `severity.Medium`, `severity.Low`
2. **Type**: `type.DocumentationBug`, `type.FunctionalityBug`
3. **Response**: `response.Accepted`, `response.CannotReproduce`, `response.IssueUnclear`, `response.Rejected`
4. **Team**: `team.*`
5. **Tutorial**: `tutorial.*`
6. **Duplicate**: `duplicate`

## Set up access rights
For each of the teams, follow the steps below to assign the right access level to the repositories. 
1. Go to their respective team page on Github.
2. Click on `Repositories` navigation tab.
3. Add the following repositories with the respective access right level as desribed below.
    1. For `admins` team.
        1. pe: `Admin`
        2. pe-results: `Admin`
        3. pe-evaluation: `Admin`
    2. For `students` team.
        1. pe: `Write`
        2. pe-results: `Write`
    3. For `tutors` team.
        1. pe: `Read`
        2. pe-results: `Read`
        3. pe-evaluation: `Write`

## To build for development

- **in a terminal window** -> npm start

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

# Commands

|Command|Description|
|--|--|
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

# Future Developments
Here are a few suggestions that future developers can work on to improve this application!

## Support Commenting
Currently, the application only support 1 response for each phase. So a commenting section would be good to allow discussions between team members as well as between tutors and admins. 

## Poll for updates
The state of the application is based on the initial log in in which the data will be pulled from Github. However, this state is not updated as the user uses the application. This might lead to problems where the user is shown an outdated version of an issue.

## Add Tester's response phase (Right after the Team's Response)
The rational for this phase is to ease the workload of tutors and admins during the evaluation phase. In this phase, testers who lodged the bug will be able to look at the team's response to their bug report. If they think that the response is unjust, they can object it.

During the evaluation phase, the tutors and admins just need focus on those bug reports with objections. Those without objections will not be moderated.

