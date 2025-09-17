import 'package:flutter/material.dart';
import 'package:mobile/pages/report/step1Report.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'alert_card.dart';

class LiveAlertsSheet extends StatelessWidget {
  const LiveAlertsSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.45,
      minChildSize: 0.45,
      maxChildSize: 0.8,
      builder: (BuildContext context, ScrollController scrollController) {
        return Container(
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(24.0),
              topRight: Radius.circular(24.0),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 15.0,
                offset: Offset(0, -5),
              ),
            ],
          ),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              ListView(
                controller: scrollController,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: <Widget>[
                  const SizedBox(height: 12),

                  Center(
                    child: Container(
                      width: 40,
                      height: 5,
                      decoration: BoxDecoration(
                        color: Colors.grey[300],
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                  const SizedBox(height: 15),
                  const Text(
                    'Live Alerts',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                  ),
                  const SizedBox(height: 20),

                  const AlertCard(
                    icon: Icons.error_outline,
                    iconColor: Colors.red,
                    backgroundColor: Color.fromRGBO(255, 235, 238, 1),
                    title: 'High Wave Warning',
                    subtitle: '15 mins ago - Verified',
                  ),
                  const SizedBox(height: 15),
                  const AlertCard(
                    icon: Icons.air,
                    iconColor: Color(0xFFFF9500),
                    backgroundColor: Color.fromRGBO(255, 243, 224, 1),
                    title: 'Strong Current Advisory',
                    subtitle: '1 hour ago - Issued',
                  ),
                  const SizedBox(height: 80),
                ],
              ),

              Positioned(
                top: 45,
                right: 20,
                child: FloatingActionButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => step1Report()),
                    );
                  },
                  backgroundColor: const Color(0xFFF57C00),
                  elevation: 4,
                  shape: const CircleBorder(),

                  child: const Icon(
                    PhosphorIconsRegular.plus,
                    color: Colors.white,
                    size: 28,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
