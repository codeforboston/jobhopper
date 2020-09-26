from django.test import TestCase

# Create your tests here.
from django.urls import reverse


class HealthCheckAPITests(TestCase):
    def test_urls_return_200(self):
        """
        Make sure that url returns 200 status code
        """
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)
