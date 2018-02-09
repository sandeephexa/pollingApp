const form = document.getElementById('vote-form');

// Form submit event
form.addEventListener('submit', e =>
{
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os:choice};
    fetch('https://localhost:3000/poll',{
        method : 'post',
        body : JSON.stringify(data),
        headers : new Headers({'Content-Type' : 'application/json'})

    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
})

// get votes from MongoDB
fetch('https://localhost:3000/poll')
.then(res => res.json())
.then(data => {
    votes = data.votes;
    const totalVotes = votes.length;
    const voteCount = votes.reduce((acc, vote) => 
    ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)) ,acc), {});
    
    
let dataPoints = [
    {label : 'Windows',y : voteCount.Windows},
    {label : 'MacOS',y : voteCount.MacOS},
    {label : 'Linux',y : voteCount.Linux},
    {label : 'Other',y : voteCount.Other}
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer)
{
     const chart = new CanvasJS.Chart('chartContainer',{
         animationEnabled : true,
         theme : 'theme1',
         title : {
             text : `Total Votes ${totalVotes}`
         },
         data : [
             {
             type : 'column',
             dataPoints : dataPoints
             }

         ]
     });
     chart.render();

     // logging pusher
     Pusher.logToConsole = true;

     var pusher = new Pusher('644ba186ce6a6a54d54b', {
       cluster: 'ap2',
       encrypted: true
     });
 
     var channel = pusher.subscribe('os-poll');
     channel.bind('os-vote', function(data) {
       dataPoints = dataPoints.map(x => {
        if(x.label == data.os)
        {
             x.y += data.points;
             return x;
        }else{
            return x;
        }

       })
       chart.render();
     });
}


    


})
.catch(err => console.log(err));
















