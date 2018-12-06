# Intro to the internet && http servers

[Slides](https://docs.google.com/presentation/d/1IeRSIA6LKo-VjVGGoCppfWVlsDng2r9IYiqNlO8BnWI/edit#slide=id.p38)

[submarine cable map](https://www.submarinecablemap.com/)

[mozilla on http codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

# Rack & The Internet

### The Internet
* Network Packets
* ARPANET
* `lo`

### Servers
* The web is all just text
* Domain names, IP addresses

### Clients
* What is a client?

### Request/Response Cycle
* HTTP Methods and Resource
* CRUD
* Status codes
* What does the browser receive?

### IP Addresses
* Everything has one
* What do routers do?

### What does a browser do?
Tools:
* ping
* nslookup
* traceroute
* curl

## Finding your IP address
* alt click wifi

### Let's have fun w/ Rack!

* How to kill a process you started unwillingly:

1. `lsof -i :9393` where `9393` is the keyword you're looking for, in this example a server process running on port 9393.
2. `kill -9 <process_id>` where `<process_id>` is as per self-explanatory name, the internal id of the process in question. Here you can see example output for performing that operation:

```
[14:56:06] restaurant
// ♥ lsof -i :9393
COMMAND   PID         USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ruby    11534 dkaczmarczyk   12u  IPv4 0xdee067917b318809      0t0  TCP localhost:9393 (LISTEN)
