# Halfmind Add-on Documentation

## Overview

The Halfmind add-on provides integration between Home Assistant and Halfmind devices, enabling a seamless smart home experience designed with ADHD-friendly features in mind.

## Technical Details

### Architecture Support
- armhf
- armv7
- aarch64
- amd64
- i386

### Dependencies
- Python 3.9+
- Network access for device communication
- Local network discovery capabilities

### Configuration Options

#### server_url
- Type: string
- Required: Yes
- Default: "http://localhost:8080"
- Description: The URL of your Halfmind server instance

#### device_id
- Type: string
- Required: No
- Default: ""
- Description: Specific device ID to connect to. If empty, the add-on will use auto-discovery

#### api_key
- Type: string
- Required: No
- Default: ""
- Description: API key for authentication with the Halfmind server

#### auto_discovery
- Type: boolean
- Required: No
- Default: true
- Description: Enable/disable automatic device discovery on the local network

#### debug_mode
- Type: boolean
- Required: No
- Default: false
- Description: Enable detailed logging for troubleshooting

## Integration Details

The add-on communicates with Halfmind devices using a REST API and WebSocket connections for real-time updates. It supports:

1. Device Discovery
   - Automatic network scanning
   - Manual device addition
   - Device status monitoring

2. Data Synchronization
   - Real-time state updates
   - Event handling
   - Command execution

3. Error Handling
   - Connection retry logic
   - Error logging
   - State recovery

## Troubleshooting

### Common Issues

1. Connection Problems
   - Verify server_url is correct
   - Check network connectivity
   - Ensure API key is valid

2. Device Discovery Issues
   - Enable debug_mode for detailed logs
   - Verify network permissions
   - Check firewall settings

### Logs

Logs can be found in the Home Assistant add-on logs section. Enable debug_mode for more detailed logging.
