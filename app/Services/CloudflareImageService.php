<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;

class CloudflareImageService
{
  private $client;

  public function __construct()
  {
    $this->client = new Client([
      'base_uri' => 'https://api.cloudflare.com/client/v4/',
      'timeout' => 10.0,
      'debug' => true,
      'headers' => [
        'Authorization' => 'Bearer ' . env('CLOUDFLARE_API_KEY'),
      ],
    ]);
  }

  public function uploadImage(string $filePath)
  {
    try {
      $response = $this->client->request(
        'POST',
        'accounts/' . env('CLOUDFLARE_ACCOUNT_ID') . '/images/v1',
        [
          'multipart' => [
            [
              'name' => 'file',
              'contents' => fopen($filePath, 'r'),
            ],
          ],
        ]
      );

      $body = $response->getBody();
      $result = json_decode($body->getContents(), true);

      if ($result['success'] === false) {
        throw new Exception(
          'Cloudflare API Error: ' . json_encode($result['errors'])
        );
      }

      return $result['result'];
    } catch (Exception $e) {
      throw new Exception('Image upload error: ' . $e->getMessage());
    }
  }

  // SOON

  // public function deleteImage($zoneId, $imageId) {

  // }
}
