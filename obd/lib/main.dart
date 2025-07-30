import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'OBD Bluetooth',
        home: BluetoothPage(),
        debugShowCheckedModeBanner: false,
      );
}

class BluetoothPage extends StatefulWidget {
  @override
  _BluetoothPageState createState() => _BluetoothPageState();
}

class _BluetoothPageState extends State<BluetoothPage> {
  BluetoothState _bluetoothState = BluetoothState.UNKNOWN;
  List<BluetoothDevice> _devicesList = [];
  BluetoothConnection? _connection;
  bool _isConnecting = false;

  int? _latestRPM;
  Timer? _timer;

  @override
  void initState() {
    super.initState();

    FlutterBluetoothSerial.instance.state.then((state) {
      setState(() => _bluetoothState = state);
    });

    FlutterBluetoothSerial.instance.getBondedDevices().then((devices) {
      setState(() => _devicesList = devices);
    });
  }

  void connectToDevice(BluetoothDevice device) async {
    try {
      setState(() => _isConnecting = true);
      _connection = await BluetoothConnection.toAddress(device.address);
      print('Connected to ${device.name}');
      setState(() => _isConnecting = false);

      _connection!.input!.listen((Uint8List data) {
        String raw = utf8.decode(data);
        setState(() {

          if (raw.contains("41 0C")) {
            final match = RegExp(r'41 0C ([0-9A-Fa-f]{2}) ([0-9A-Fa-f]{2})')
                .firstMatch(raw);
            if (match != null) {
              int A = int.parse(match.group(1)!, radix: 16);
              int B = int.parse(match.group(2)!, radix: 16);
              _latestRPM = ((A * 256) + B) ~/ 4;
            }
          }
        });
      });

      _timer = Timer.periodic(Duration(seconds: 1), (_) {
        sendOBDCommand("010C");
      });

    } catch (e) {
      setState(() => _isConnecting = false);
      print("Connection failed: $e");
    }
  }

  void sendOBDCommand(String command) {
    if (_connection != null && _connection!.isConnected) {
      String fullCommand = '$command\r';
      _connection!.output.add(Uint8List.fromList(utf8.encode(fullCommand)));
      _connection!.output.allSent;
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _connection?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('OBD-II Scanner')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text('Bluetooth State: $_bluetoothState'),
          ),
          if (_isConnecting)
            CircularProgressIndicator()
          else if (_connection == null || !_connection!.isConnected)
            Expanded(
              child: ListView(
                children: _devicesList.map((device) {
                  return ListTile(
                    title: Text(device.name ?? "Unknown"),
                    subtitle: Text(device.address),
                    onTap: () => connectToDevice(device),
                  );
                }).toList(),
              ),
            )
          else
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Connected!",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 20),
                  Text(
                    "Latest RPM: ${_latestRPM ?? '--'}",
                    style: TextStyle(fontSize: 24, color: Colors.blueAccent),
                  ),
                  SizedBox(height: 20),
                  SizedBox(height: 30),
                  ElevatedButton.icon(
                    onPressed: () {
                      // Cleanup and reset connection
                      _timer?.cancel();
                      _connection?.dispose();
                      setState(() {
                        _connection = null;
                        _latestRPM = null;
                      });
                    },
                    icon: Icon(Icons.arrow_back),
                    label: Text("Back"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    ),
                  ),
                ],
              ),
            )
        ],
      ),
    );
  }
}
