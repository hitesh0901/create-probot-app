/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })

  app.on('issues.edited', async context => {
    app.log(context.issue)
    const issueComment = context.issue({ body: 'Thank you for editing this issue!' })
    app.log('Inside listener!')
    console.log('Log from console log')
    //context.log(context.github.issues.list())
    app.log(issueComment)
    var customIssueComment = { number:'17', owner:'hitesh0901', repo:'probot-test-repo', body:"Thank you for editing this issue!" }
    app.log(customIssueComment)
    // return context.github.issues.createComment(issueComment)
    return context.github.issues.createComment(customIssueComment)
  })

  app.on('push', async context => {
    app.log('Code is pushed to repository')
  })

  app.on('issues', async context => {
    app.log('Issue event occured')
  })

  app.on('pull_request', async context => {
    app.log('pull_request event occured')
    //app.log(context) //works
    // app.log(context.github) //works
    //app.log(context.payload) //works
    //app.log(context.payload.assignees)
    //app.log(context.github.pullRequests.listReviews)
    // app.log(context.payload.pull_request) //works
    //app.log(context.payload.pull_request.user) //works
    // app.log(context.payload.pull_request.requested_reviewers) //works
    // app.log(context.payload.pull_request.changed_files) //works: number of changed files

    // const reviewRegquest = context.payload.pullRequests
    // context.github.pullRequests.listR
    /* Below code is working
    var customReviewRegquest = { owner:'hitesh0901', repo:'probot-test-repo', number:18, reviewers:['zoewangg']}
    return context.github.pullRequests.createReviewRequest(customReviewRegquest)
    */
    var customListCommits = { owner:'hitesh0901', repo:'probot-test-repo', number:18}
    //var files = context.github.pullRequests.listFiles(customListCommits)
    //app.log(files)
    // context.github.pullRequests.listFiles(customListCommits).then(app.log) //works

    /* below code works
    context.github.pullRequests.listFiles(customListCommits).then(function(response) {
      app.log(response.data)
    })
    */

   context.github.pullRequests.listFiles(customListCommits).then( (response) => {
    //app.log(response.data)
    response.data.forEach( (entry) => {
      app.log(entry.filename)
    })
  })

  })

  app.on('pull_request_review', async context => {
    app.log('pull_request_review event occured')
  })

  app.on('pull_request_review_comment', async context => {
    app.log('pull_request_review_comment event occured')
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
