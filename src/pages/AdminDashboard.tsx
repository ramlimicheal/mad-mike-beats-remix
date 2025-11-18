import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAllBeats, useDeleteBeat, useToggleBeatActive, useToggleBeatFeatured } from '@/hooks/useBeats';
import { usePurchases } from '@/hooks/usePurchases';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import BeatUploadForm from '@/components/BeatUploadForm';
import { toast } from 'sonner';
import { LogOut, Music, DollarSign, Users, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');

  const { data: beats, isLoading: beatsLoading } = useAllBeats();
  const { data: purchases, isLoading: purchasesLoading } = usePurchases();
  const deleteBeat = useDeleteBeat();
  const toggleActive = useToggleBeatActive();
  const toggleFeatured = useToggleBeatFeatured();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
    if (!loading && user && !isAdmin) {
      toast.error('You do not have admin access');
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeleteBeat = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this beat?')) {
      try {
        await deleteBeat.mutateAsync(id);
        toast.success('Beat deleted successfully');
      } catch (error) {
        toast.error('Failed to delete beat');
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await toggleActive.mutateAsync({ id, isActive: !currentStatus });
      toast.success(`Beat ${!currentStatus ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error('Failed to update beat status');
    }
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await toggleFeatured.mutateAsync({ id, isFeatured: !currentStatus });
      toast.success(`Beat ${!currentStatus ? 'featured' : 'unfeatured'}`);
    } catch (error) {
      toast.error('Failed to update beat featured status');
    }
  };

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const totalRevenue = purchases?.reduce((sum, p) => sum + p.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Beats</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{beats?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{purchases?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Beats</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {beats?.filter(b => (b as any).is_active).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upload">Upload Beat</TabsTrigger>
            <TabsTrigger value="beats">Manage Beats</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Beat</CardTitle>
              </CardHeader>
              <CardContent>
                <BeatUploadForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="beats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Beats</CardTitle>
              </CardHeader>
              <CardContent>
                {beatsLoading ? (
                  <p>Loading beats...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Artist</TableHead>
                          <TableHead>Genre</TableHead>
                          <TableHead>BPM</TableHead>
                          <TableHead>Key</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {beats?.map((beat: any) => (
                          <TableRow key={beat.id}>
                            <TableCell className="font-medium">{beat.title}</TableCell>
                            <TableCell>{beat.artist}</TableCell>
                            <TableCell>{beat.genre}</TableCell>
                            <TableCell>{beat.bpm}</TableCell>
                            <TableCell>{beat.key}</TableCell>
                            <TableCell>
                              <Badge variant={beat.is_active ? 'default' : 'secondary'}>
                                {beat.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={beat.is_featured ? 'default' : 'outline'}>
                                {beat.is_featured ? 'Featured' : 'Not Featured'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleToggleActive(beat.id, beat.is_active)}
                                >
                                  {beat.is_active ? 'Deactivate' : 'Activate'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleToggleFeatured(beat.id, beat.is_featured)}
                                >
                                  {beat.is_featured ? 'Unfeature' : 'Feature'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteBeat(beat.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                {purchasesLoading ? (
                  <p>Loading purchases...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Beat</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>License</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>License Code</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {purchases?.map((purchase: any) => (
                          <TableRow key={purchase.id}>
                            <TableCell>
                              {new Date(purchase.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{purchase.beat?.title || 'N/A'}</TableCell>
                            <TableCell>{purchase.customer_name}</TableCell>
                            <TableCell>{purchase.customer_email}</TableCell>
                            <TableCell>
                              <Badge>{purchase.license_type}</Badge>
                            </TableCell>
                            <TableCell>${purchase.amount}</TableCell>
                            <TableCell>
                              <Badge variant={purchase.payment_status === 'completed' ? 'default' : 'secondary'}>
                                {purchase.payment_status}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {purchase.license_code}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
