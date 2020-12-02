from django.test import TestCase

# Create your tests here.
from django.urls import reverse


class LeadsApiTests(TestCase):
    def test_urls_return_valid_code(self):
        """
        Make sure that url returns valid status code
        """
        response = self.client.get("/jobs/api/leads")
        self.assertEqual(response.status_code, 404)
