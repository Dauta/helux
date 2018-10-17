# helux
Node.js wrapper for f.lux on Linux

---
## DISCLAIMER:

I am in no way associated nor do I own any part of _f.lux_ or _xflux_ software.

This is simply an extension to make it more usable for myself and hopefully others. This software is non-profit and free to use and/or copy for everyone.
The _xflux_ binary is from [here](https://justgetflux.com/linux.html).

---

## Install

Helux runs on Node.js, so working node and npm are required.

- `git clone https://github.com/Dauta/helux.git`
- navigate to the project directory and `./install-helux` (this will run `npm-install` and create symlinks in your /usr/bin to use `helux-on/off` commands globally. It might ask for a sudo password input)

### Usage

- `helux-on {YOUR LOCATION}` to start helux. YOUR LOCATION usually refers to your city/town, but it will accept anything Google Maps understands (thanks to [Nominatim API](https://wiki.openstreetmap.org/wiki/Nominatim#Example_2))
- `helux-off` to stop Helux.

### Uninstall

- To uninstall Helux navigate to project directory and run `./uninstall-helux` (this will remove the symlinks)
