import { json2Blob } from './download';

describe('json2Blob', () => {
  it('should create a Blob with the correct JSON payload and mime type', async () => {
    const payload = { hello: 'world', count: 42 };
    const blob = json2Blob(payload);

    // ---- type -------------------------------------------------
    expect(blob.type).toBe('text/json;charset=utf-8;');

    // ---- content ----------------------------------------------
    const text = await blob.text();
    expect(JSON.parse(text)).toEqual(payload);
  });
});

