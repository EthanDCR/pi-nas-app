# File Share Pi

file sharing app i made for me and my roommates because we all have different operating systems (windows/mac/linux) and needed an easy way to share files without dealing without constantly using email

## what is this

basically just a web app running on a raspberry pi in my room. you can upload files, download files, and delete files. thats pretty much all it needs to do right now, 
currently just writing the bytes sent over http from the ui to the filesystem of the pi or ill just scp files there over ssh and my roomates use the ui

## why does this exist

no airdrop when you have mixed os's. a decent NAS is expensive.  all my homies hate cloud storage . plus fun.



[alt text](./client/public/readmepic.png)




## tech stack

- **frontend**: typescript
- **backend**: go
- **storage**: literally just writing to a folder on the pi , we dont store a bunch of movies or anything so no need to run a database on there or anything


## how to use

just connect to your network and go to `yourIp:8080`
- view all files that are stored
- download files
- delete files
- see how much storage is being used (syscalls to the pi os with go but this works across machines when cross compiled)

## setup

if you want to run this

### backend (go server)
```bash
cd server
go run main.go
```

### frontend (development)
```bash
cd client
npm install
npm run dev
```

### production build
```bash
cd client
npm run build
```

 - The go server will automatically serve the production build if it finds it in `client/dist`
currently if i want to make changes I just build the typescript with npm and then copy that dir over to the pi over ssh 
and for the server I cross compile it for 32bit arm chips like my pi and the scp it over to the pi 
as a single binary

- there is zero security , built to be accessed by any machine on the local network



