import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class HomseScreen extends StatefulWidget {
  const HomseScreen(BuildContext context, {super.key});

  @override
  State<StatefulWidget> createState() => HomseScreenState();
}

//something
class HomseScreenState extends State<StatefulWidget> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: Text("Hey this is home")));
  }
}
