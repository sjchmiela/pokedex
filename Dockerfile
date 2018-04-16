# Source: https://pspdfkit.com/blog/2018/how-to-run-your-phoenix-application-with-docker/

# ./Dockerfile

# Extend from the official Elixir image
FROM elixir:1.6.4

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && \
  apt-get install -y postgresql-client inotify-tools nodejs build-essential yarn

# https://hub.docker.com/r/jotadrilo/watchman/~/dockerfile/
ENV WATCHMAN_VERSION=4.9.0
RUN apt-get install -y libssl-dev pkg-config libtool curl ca-certificates build-essential autoconf python-dev libpython-dev autotools-dev automake && \
  curl -LO https://github.com/facebook/watchman/archive/v${WATCHMAN_VERSION}.tar.gz && \
  tar xzf v${WATCHMAN_VERSION}.tar.gz && rm v${WATCHMAN_VERSION}.tar.gz && \
  cd watchman-${WATCHMAN_VERSION} && ./autogen.sh && ./configure && make && make install && \
  apt-get purge -y build-essential pkg-config curl autoconf python-dev libpython-dev autotools-dev automake libtool && \
  cd /tmp && rm -rf watchman-${WATCHMAN_VERSION}

# Install hex package manager
RUN mix local.hex --force
RUN mix local.rebar --force

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
COPY entrypoint.sh /app
WORKDIR /app

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
