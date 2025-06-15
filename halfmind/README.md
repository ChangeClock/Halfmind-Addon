# Halfmind Add-on for Home Assistant

This add-on integrates Halfmind devices with your Home Assistant instance, allowing you to build an ADHD-friendly smart home environment.

## Features

- Seamless integration with Halfmind devices
- Automatic device discovery
- Real-time device status monitoring
- Customizable device settings
- Debug mode for troubleshooting

## Installation

1. Add this repository to your Home Assistant instance
2. Install the "Halfmind" add-on
3. Configure the add-on with your settings
4. Start the add-on

## Configuration

```yaml
server_url: "http://localhost:8080"  # URL of your Halfmind server
device_id: ""                        # Optional: Specific device ID to connect
api_key: ""                          # Optional: API key for authentication
auto_discovery: true                 # Enable/disable automatic device discovery
debug_mode: false                    # Enable/disable debug logging
```

## Support

For support, please visit:
- GitHub Issues: [Halfmind Addon Issues](https://github.com/ChangeClock/Halfmind-Addon/issues)
- Documentation: [Halfmind Documentation](https://github.com/ChangeClock/Halfmind-Addon/blob/main/halfmind/DOCS.md)
