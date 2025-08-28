import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Link, FileText, Image, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ArticleResult {
  url: string;
  title: string;
  content: string;
  images: string[];
  categories: { [key: string]: number };
  ai_content: {
    summary: string;
    key_takeaways: string[];
    social_snippet: string;
  };
}

export const ArticleProcessor = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArticleResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response
      const mockResult: ArticleResult = {
        url,
        title: "Revolutionary AI Breakthrough Changes Everything",
        content: "In a groundbreaking development that could reshape the future of artificial intelligence, researchers have announced a new paradigm that promises to revolutionize how we interact with technology. This breakthrough represents years of research and innovation...",
        images: [
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400"
        ],
        categories: {
          "Technology": 0.95,
          "AI & Machine Learning": 0.87,
          "Innovation": 0.72
        },
        ai_content: {
          summary: "A major AI breakthrough has been announced that could transform technology interaction paradigms and reshape future development.",
          key_takeaways: [
            "Revolutionary AI paradigm announced",
            "Years of research culminated",
            "Future technology interactions redefined",
            "Industry-wide implications expected"
          ],
          social_snippet: "🚀 BREAKING: Revolutionary AI breakthrough announced! This could change everything about how we interact with technology. #AI #Innovation #TechNews"
        }
      };
      
      setResult(mockResult);
      toast({
        title: "Article processed successfully!",
        description: "Content extracted and analyzed."
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Please try again with a valid URL.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Article Content Processor</CardTitle>
              <CardDescription>
                Extract, analyze, and generate AI insights from any article
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter article URL (e.g., https://example.com/article)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 transition-all duration-300 focus:shadow-glow"
                disabled={loading}
              />
              <Button 
                type="submit" 
                disabled={loading || !url.trim()}
                className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Link className="mr-2 h-4 w-4" />
                    Process Article
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-card opacity-30" />
            <CardHeader className="relative">
              <CardTitle className="text-lg">Article Details</CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Title</h3>
                <p className="font-medium">{result.title}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(result.categories).map(([category, confidence]) => (
                    <Badge 
                      key={category} 
                      variant="secondary"
                      className="bg-gradient-primary text-primary-foreground"
                    >
                      {category} ({Math.round(confidence * 100)}%)
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Content Preview</h3>
                <p className="text-sm line-clamp-4">{result.content}</p>
              </div>

              {result.images.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Images Found</h3>
                  <div className="flex gap-2 overflow-x-auto">
                    {result.images.slice(0, 3).map((image, i) => (
                      <div key={i} className="relative flex-shrink-0">
                        <img 
                          src={image} 
                          alt={`Article image ${i + 1}`}
                          className="w-16 h-16 rounded-lg object-cover border border-border"
                        />
                      </div>
                    ))}
                    {result.images.length > 3 && (
                      <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-muted text-muted-foreground text-xs">
                        +{result.images.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-card opacity-30" />
            <CardHeader className="relative">
              <CardTitle className="text-lg">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Summary</h3>
                <p className="text-sm">{result.ai_content.summary}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Key Takeaways</h3>
                <ul className="space-y-1">
                  {result.ai_content.key_takeaways.map((takeaway, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <TrendingUp className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Social Media Snippet</h3>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-sm">{result.ai_content.social_snippet}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};