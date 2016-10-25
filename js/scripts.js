$(document).ready(function() {
  $('form :input[type="submit"]').on('click', submitForm);
});

function submitForm(event) {
  let inputs = collectInputs();
  createIssue(inputs.repoName, inputs.repoOwner, inputs.title, inputs.body);
  event.preventDefault();
}

function GithubInteractor(token) {
  this.baseURL = 'https://api.github.com/repos/';
  this.token = token;
}

function createIssue(repoName, repoOwner, title, content) {
  let githubInfo = new GithubInteractor("blahblah");
  let url = githubInfo.baseURL + repoOwner + '/' + repoName + '/issues';
  let data = {
    title: title,
    body: content
  };
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + githubInfo.token
    },
    data: JSON.stringify(data),
    success: function(response) {
      console.log(response);
      return handleResponse(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log(error);
      return handleError(jqXHR, textStatus, errorThrown);
    }
  });
}

function handleResponse(response) {
  let link = $(`<a href="${response.html_url}">${response.title}</a>`);
  $('#issue').append(link);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}


// Helpers

function collectInputs() {
  let inputs = {};
  $('form :input').each(function (el) {
    if ($(this).attr('id')) {
      inputs[$(this).attr('id')] = $(this).val();
    }
  });
  return inputs;
}

function buildUrl(base, repoOwner, repoName) {
  return base + repoOwner + '/' + repoName + '/issues';
}