FROM golang:1.9-alpine as builder

RUN apk add --update git make gcc musl-dev linux-headers

RUN git clone https://github.com/ethereum/go-ethereum.git /go-ethereum
RUN cd /go-ethereum && make geth

FROM alpine:latest
RUN apk add --no-cache ca-certificates bind-tools
COPY --from=builder /go-ethereum/build/bin/geth /usr/local/bin/
COPY run.sh /

EXPOSE 8545 8546 30303 30303/udp 30304/udp
ENTRYPOINT [ "/run.sh"]
