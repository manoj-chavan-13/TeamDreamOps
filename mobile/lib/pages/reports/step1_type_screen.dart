import 'package:flutter/material.dart';
import 'step2_details_screen.dart'; // <-- Change 'your_app_name'

class ReportHazardStep1TypeScreen extends StatelessWidget {
  const ReportHazardStep1TypeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        backgroundColor: Colors.white,
        foregroundColor: Colors.white,
        title: const Column(
          children: [
            Text(
              'Report a Hazard',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            Text(
              'Step 1 of 3: Select Type',
              style: TextStyle(fontSize: 14, color: Colors.grey),
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'What did you see?',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _buildHazardCard(context, 'Tsunami', Icons.tsunami_outlined),
                  _buildHazardCard(context, 'High Waves', Icons.waves_outlined),
                  _buildHazardCard(context, 'Flooding', Icons.flood_outlined),
                  _buildHazardCard(
                    context,
                    'Unusual Tide',
                    Icons.height_outlined,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHazardCard(BuildContext context, String title, IconData icon) {
    return Card(
      elevation: 1,
      color: Colors.white,

      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () {
          // Navigate to Step 2, passing the selected hazard type
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) =>
                  ReportHazardStep2DetailsScreen(hazardType: title),
            ),
          );
        },
        borderRadius: BorderRadius.circular(12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48, color: Theme.of(context).colorScheme.primary),
            const SizedBox(height: 12),
            Text(
              title,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}
