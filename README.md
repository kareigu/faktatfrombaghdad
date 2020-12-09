# FaktatfromBaghdad

### Delivering the facts

![preview](img/preview.png)


`npm install`

#### configure .env
`TOKEN=<discord bot token>`  
`GOOGLE_APPLICATION_CREDENTIALS=<relative path to your google service api configuration file>`  

### Building docker and running image  

`docker build -t <give a name to the image>`  
`docker run -d --name <give a name to the container> --restart unless-stopped <name given to the image>`