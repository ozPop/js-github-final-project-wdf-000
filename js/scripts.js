$(document).ready(function() {
  $('form :input[type="submit"]').on('click', submitForm);
});

function GithubInteractor(token) {
  this.baseurl = 'https://api.github.com/repos/';
  this.token = token;
}

function submitForm(event) {
  let inputs = collectInputs();
  // let githubInfo = new GithubInteractor("8f078dd982a111ca16de5dc3d6b2e86864053147");
  // createIssue(inputs, token);
  createIssue(inputs.repoName, inputs.repoOwner, inputs.title, inputs.body, token);
  event.preventDefault();
}

function collectInputs() {
  let inputs = {};
  $('form :input').each(function (el) {
    if ($(this).attr('id')) {
      inputs[$(this).attr('id')] = $(this).val();
    }
  });
  return inputs;
}

function createIssue(repoName, repoOwner, issueTitle, issueContent, token) {
  const url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    header: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify({
      title: issueTitle,
      body: issueContent
    }),
    success: function(jsonData) {
      console.log(jsonData);
      return handleResponse(jsonData);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log(error);
      return handleError(jqXHR, textStatus, errorThrown);
    }
  });
}

function handleResponse(jsonData) {
  let link = $(`<a href="${jsonData.html_url}">${jsonData.title}</a>`);
  $('#issue').append(link);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}