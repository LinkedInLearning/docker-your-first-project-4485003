# Docker: Your First Project
This is the repository for the LinkedIn Learning course `Docker: Your First Project`. The full course is available from [LinkedIn Learning][URL-lil-course].

![Docker: Your First Project][URL-lil-thumbnail]

Docker has a steep learning curve, but is required for most current development environments. Streamlining how you build, share, and run applications can increase your development team’s productivity and let developers focus on the code. This course with instructor Shelley Benhoff provides a step-by-step guide for developers to work with Docker locally. Join Shelley as she takes you through a real-world project and learn how to set up your development environment, write a Dockerfile, build and manage custom images, and run your Docker containers.

## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Installing
1. To use these exercise files, you must have the following installed:
	- Docker Desktop
    - VSCode
    - Git Bash
2. Clone this repository into your local machine using the Git Bash command `git clone https://github.com/LinkedInLearning/docker-your-first-project-4485003.git`
3. Switch between branches using the Git Bash command `git checkout CHAPTER#_MOVIE#`
4. View all available branches using the Git Bash command `git branch`

### Instructor
Shelley Benhoff


Senior Developer Experience Manager at Docker, Instructor, and Author

Check out my other courses on [LinkedIn Learning][URL-instructor-home].

[URL-lil-course]: https://www.linkedin.com/learning/docker-your-first-project
[URL-lil-thumbnail]: https://media.licdn.com/dms/image/D560DAQHjKrL64jLnaA/learning-public-crop_675_1200/0/1701991509593?e=2147483647&v=beta&t=VwonMpzrnmxJk07lG2SRqLwwR2gqj7vPCsJp51Ryu7k
[URL-instructor-home]: https://www.linkedin.com/learning/instructors/shelley-benhoff

