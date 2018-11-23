FROM golang:1.9-alpine as builder

# Install depedencies
RUN apk add --update git make gcc musl-dev linux-headers

# Clone go-ethereum
RUN git clone https://github.com/ethereum/go-ethereum.git /go-ethereum
# Exec ./cmd/bootnode/main.go -- bootnode runs a bootstrap node for the Ethereum Discovery Protocol
RUN cd /go-ethereum && build/env.sh go run build/ci.go install ./cmd/bootnode

FROM alpine:latest
RUN apk add --no-cache ca-certificates
COPY --from=builder /go-ethereum/build/bin/bootnode /usr/local/bin/
COPY run.sh /

EXPOSE 30301
ENTRYPOINT [ "/run.sh"]
