# /bin/bash

# Prerequisites:
#   Temporarily run a high performance EC2 for setup
#   scp setup.ec2.sh to /home/ubuntu
#   scp vimrc to /home/ubuntu
# Root user ~/.bashrc additions:
#   alias rm='rm -v';
#   export PATH="/root/.local/share/solana/install/active_release/bin:$PATH";
#   cd ~;

echo "Did you complete the prerequisites listed at top of setup.ec2.sh?";
echo "Press enter to continue";
read;

if [ $(whoami) != "root" ]; then
  echo "Run this as the root user";
  exit 1;
fi

# Ubuntu 20.04.3 LTS (GNU/Linux 5.11.0-1022-aws x86_64)
# AWS EC2 image ID: ami-0892d3c7ee96c0bf7
host_version=$(lsb_release -a | grep Release | sed 's/Release:\s//');
if [ $host_version != "20.04" ]; then
  echo "Expected Ubuntu 20.04";
  echo "This host: "$host_version;
  exit 1;
fi

# Remain in the default UTC-0 timezone
host_timezone=$(date +"%Z");
if [ $host_timezone != "UTC" ]; then
  echo "Expected: UTC";
  echo "This host: "$host_timezone;
  exit 1;
fi

echo "Checking for Ubuntu updates";
cd ~;
apt update && apt upgrade -y;

echo "Installing Linux packages";
apt install -y gcc unzip pkg-config build-essential libudev-dev libssl-dev;

has_aws_dir=$(ls -a ~ | egrep "^.aws$");
if [ -z $has_aws_dir ]; then
  echo "Setting up AWS";
  mkdir ~/.aws;
  touch ~/.aws/credentials;
  echo "AWS access key:";
  read aws_access;
  echo "AWS secret key:";
  read aws_secret;
  echo "[default]" >> ~/.aws/credentials;
  echo "aws_access_key_id="$aws_access >> ~/.aws/credentials;
  echo "aws_secret_access_key="$aws_secret >> ~/.aws/credentials;
else
  echo "AWS already set up";
  cat ~/.aws/credentials;
fi

# AWS CLI
has_aws_cli=$(command -v aws);
if [ -z $has_aws_cli ]; then
  echo "Installing AWS CLI";
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip";
  unzip awscliv2.zip;
  ./aws/install;
else
  echo "AWS CLI already installed";
  aws --version;
fi

# MongoDB
has_mongo=$(command -v mongo);
if [ -z $has_mongo ]; then
  echo "Installing MongoDB";
  wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -;
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list;
  apt-get update;
  apt-get install -y mongodb-org=5.0.8 mongodb-org-database=5.0.8 mongodb-org-server=5.0.8 mongodb-org-shell=5.0.8 mongodb-org-mongos=5.0.8 mongodb-org-tools=5.0.8;
else
  echo "MongoDB already installed";
  mongo --version;
fi

echo "Installing plugins for vim";
has_vim_dir=$(ls -a ~ | egrep "^.vim$");
if [ -z $has_vim_dir ]; then
  mkdir ~/.vim;
fi
has_vim_bundle_dir=$(ls ~/.vim/ | grep bundle);
if [ -z $has_vim_bundle_dir ]; then
  mkdir ~/.vim/bundle;
fi
cd ~/.vim/bundle/;

# Plugin manager 
has_vim_vundle=$(ls | grep Vundle.vim);
if [ -z $has_vim_vundle ]; then
  git clone https://github.com/VundleVim/Vundle.vim.git;
fi

# ES6 syntax plugin
has_vim_es6=$(ls | grep vim-es6);
if [ -z $has_vim_es6 ]; then
  git clone https://github.com/isRuslan/vim-es6.git;
fi

# Rust syntax plugin
has_vim_rust=$(ls | grep rust.vim);
if [ -z $has_vim_rust ]; then
  git clone https://github.com/rust-lang/rust.vim;
fi

# Solidity syntax plugin
has_vim_solidity=$(ls | grep vim-solidity);
if [ -z $has_vim_solidity ]; then
  git clone https://github.com/tomlion/vim-solidity.git;
fi

has_root_vimrc=$(ls -a ~ | egrep "^\.vimrc$");
has_vimrc=$(ls /home/ubuntu | egrep "^vimrc$");
if [ -z $has_root_vimrc ]; then
  if [ -z $has_vimrc ]; then
    echo "vimrc file not found";
    exit 1;
  else
    mv /home/ubuntu/vimrc ~/.vimrc;
  fi
fi
cd ~;
echo "Installed plugins for vim";

has_rust=$(command -v rustc);
if [ -z $has_rust ]; then
  echo "Installing Rust";
  curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh && source ~/.cargo/env;
else
  echo "Rust already installed";
  rustup --version;
  cargo --version;
fi

has_node=$(command -v node);
if [ -z $has_node ]; then
  echo "Installing Node and NPM";
  curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs;
else
  echo "Node and NPM already installed";
  echo "Node "$(node --version);
  echo "NPM v"$(npm --version);
fi

has_sol_cli=$(command -v solana);
if [ -z $has_sol_cli ]; then
  echo "Installing Solana CLI";
  sh -c "$(curl -sSfL https://release.solana.com/stable/install)";
else
  echo "Solana CLI already installed";
  solana --version;
fi

has_anchor=$(command -v anchor);
if [ -z $has_anchor ]; then
  echo "Installing Anchor";
  cargo install --git https://github.com/project-serum/anchor avm --locked --force;
  avm install latest;
  avm use latest;
else
  echo "Anchor already installed";
  anchor --version;
fi

echo "Done!";

