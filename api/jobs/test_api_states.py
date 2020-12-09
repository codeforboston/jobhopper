from django.test import TestCase

# Create your tests here.
from django.urls import reverse


class StatesAPITests(TestCase):
    def test_state_urls_return_200(self):
        """
        Make sure that url returns 200 status code
        """
        # True at the end makes it follow.
        response = self.client.get("/api/v1/jobs/state", {}, True)
        # print(dir(response))
        # print(f"result code is {response.status_code}")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.content.decode()) > 0)
