from django.test import TestCase

# Create your tests here.
from django.urls import reverse


class SocCodesAPITests(TestCase):
    def test_soccodes_urls_return_200(self):
        """
        Make sure that url returns 200 status code
        """
        # True at the end makes it follow.
        response = self.client.get("/jobs/soc-codes", {}, True)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.content.decode()) > 0)
