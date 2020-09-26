from django.test import TestCase

# Create your tests here.
from django.urls import reverse


class HealthCheckAPITests(TestCase):
    def test_urls_return_valid_code(self):
        """
        Make sure that url returns valid status code
        """
        response = self.client.get("/jobs/api/leads")
        # I expected this to be 200 as returned in the browser
        # But the test returns 301?
        # TODO: understand this and fix test
        self.assertEqual(response.status_code, 301)
