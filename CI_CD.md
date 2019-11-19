CI :  means When developer commit some file, that file should be cover by some automatic tests. And if that tests pass, we can push changes in some global repository(bitbacket,github..). Then we can analyze our code with sonar, and run build, unit tests with TeamCity for example which allows as run some test environment server.

 For CD we should run integration test by QA, check UAT(User Acceptance Testing) and  run Load/Stress testing then with Jenkins or Octopus takes artifact created by TeamCity build and deploy our project.

We should do this process  as much as we can, for CI  constantly pushing code to some repo  and also for CD constantly deploy. And for that reason we get more deployments and avoid situation to deploy some big file.