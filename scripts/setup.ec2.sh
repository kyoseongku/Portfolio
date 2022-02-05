# /bin/bash

# scp setup.ec2.sh and vimrc to /home/ubuntu

echo "Starting setup script";

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

echo "Installing Rust";
has_rust=$(command -v rustc);
if [ -z $has_rust ]; then
  curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh && source ~/.cargo/env;
fi
cargo --version;
rustup --version;

echo "Installing Node and NPM";
has_node=$(command -v node);
if [ -z $has_node ]; then
  curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs;
fi
echo "Node (v16.13.2 when script written): "$(node --version);
echo "NPM (v8.1.2 when script written): v"$(npm --version);

cd ~;
echo "Done!";

