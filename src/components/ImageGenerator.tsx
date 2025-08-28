import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ImageIcon, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageResult {
  prompt: string;
  image_base64: string;
}

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Mock base64 image (placeholder)
      const mockResult: ImageResult = {
        prompt,
        image_base64: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iNjAiIGZpbGw9IiMzQjgyRjYiLz4KPHN2ZyB4PSIyMDAiIHk9IjE5NiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZmZmIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgo8cGF0aCBkPSJNNSAzYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0yVjVhMiAyIDAgMCAwLTItMkg1em0yIDJ2LjAxTDEzIDEybDMgNGgtMTJWNXptMCA2IDUtNSAyIDJMOSAxMnoiLz4KPC9zdmc+Cjx0ZXh0IHg9IjI1NiIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUM4RTliIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTRweCIgZm9udC13ZWlnaHQ9IjUwMCI+R2VuZXJhdGVkIEltYWdlPC90ZXh0Pgo8dGV4dCB4PSIyNTYiIHk9IjM3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEycHgiPkJhc2VkIG9uIHlvdXIgcHJvbXB0PC90ZXh0Pgo8L3N2Zz4='
      };
      
      setResult(mockResult);
      toast({
        title: "Image generated successfully!",
        description: "Your AI-generated image is ready."
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again with a different prompt.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `generated-image-${Date.now()}.png`;
    link.click();
    
    toast({
      title: "Download started",
      description: "Image is being downloaded to your device."
    });
  };

  const copyToClipboard = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.image_base64);
      toast({
        title: "Copied to clipboard",
        description: "Base64 string has been copied."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-subtle">
        <CardHeader className="pb-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-heading">AI Image Generator</CardTitle>
              <CardDescription className="text-muted-foreground">
                Create custom images from detailed text descriptions using advanced AI
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Image Description</label>
              <Textarea
                placeholder="Describe the image you want to generate in detail... (e.g., 'A professional office workspace with modern technology, natural lighting, clean lines')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-24 transition-micro focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows={4}
                disabled={loading}
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full transition-micro hover:shadow-subtle"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Image...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-border shadow-subtle">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <CardTitle className="text-xl font-heading">Generated Image</CardTitle>
              <CardDescription className="text-muted-foreground font-medium">
                "{result.prompt}"
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative group">
              <img
                src={result.image_base64}
                alt="AI generated image"
                className="w-full h-auto rounded-lg border border-border shadow-moderate transition-micro group-hover:shadow-emphasis"
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={downloadImage}
                variant="outline"
                className="flex-1 transition-micro hover:bg-secondary"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex-1 transition-micro hover:bg-secondary"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Base64
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Base64 Encoded Output</label>
              <div className="p-4 rounded-lg bg-secondary border border-border max-h-32 overflow-y-auto">
                <code className="text-xs font-mono text-secondary-foreground break-all">{result.image_base64}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};